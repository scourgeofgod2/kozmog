#!/usr/bin/env bash
# Örnek rapor PDF'lerini ve sayfa önizlemelerini yeniden üretir.
# Önce sunucuyu ADMIN_TOKEN ile başlat:  ADMIN_TOKEN=xxxxxxxxxxxxxxxx npm start
# Sonra:  ADMIN_TOKEN=xxxxxxxxxxxxxxxx BASE=http://localhost:3000 bash scripts/ornekler/generate.sh
# Gerekli: python3, curl, pdftoppm (poppler-utils), node (sharp)
set -euo pipefail
cd "$(dirname "$0")/../.."
BASE="${BASE:-http://localhost:3000}"
mkdir -p public/ornekler
python3 - "$BASE" "$ADMIN_TOKEN" <<'PY'
import json, subprocess, sys
base, token = sys.argv[1], sys.argv[2]
person = {"name": "Deniz Ay", "birthDate": "1994-07-21", "contact": "ornek@kozmograf.com", "code": "KZ-ORNEK"}
jobs = [("kozmik-harita", "harita", "kozmik-harita", {}),
        ("yil-2027", "yil", "2027-yil-rehberi", {}),
        ("ask-uyumu", "ask", "ask-uyum-raporu", {"partnerName": "Emre Kaya", "partnerBirthDate": "1991-11-03"})]
for pkg, sec, name, extra in jobs:
    body = {"token": token, "mode": "preview", "sample": True, "order": {**person, "pkg": pkg, **extra},
            "texts": {sec: open(f"scripts/ornekler/{sec}.md", encoding="utf-8").read()}}
    out = f"public/ornekler/kozmograf-ornek-{name}.pdf"
    subprocess.run(["curl", "-sf", "-o", out, "-X", "POST", f"{base}/api/admin/deliver",
                    "-H", "Content-Type: application/json", "-d", json.dumps(body)], check=True)
    subprocess.run(["pdftoppm", "-r", "110", "-f", "1", "-l", "2", "-png", out, f"/tmp/kz-{name}"], check=True)
    print(out)
PY
node -e "
const sharp=require('sharp');(async()=>{for(const n of ['kozmik-harita','2027-yil-rehberi','ask-uyum-raporu'])for(const p of [1,2]){
const f=require('fs').readdirSync('/tmp').find(x=>x.startsWith('kz-'+n+'-')&&x.endsWith(p+'.png'));
await sharp('/tmp/'+f).resize({width:720}).webp({quality:80}).toFile('public/ornekler/kozmograf-ornek-'+n+'-sayfa-'+p+'.webp');}})()"
echo "tamam"
