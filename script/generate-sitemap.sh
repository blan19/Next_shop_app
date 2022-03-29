cd public

rm -rf sitemap
mkdir sitemap

cd ..
cd script

node ./robots.js

echo "정적 sitemap 생성중.."
node ./sitemap-common.js
echo "정적 sitemap 생성 완료"

#동적 sitemap 생성
echo "동적 sitemap 조회 및 생성중.."
node ./sitemap-posts.js
echo "동적 sitemap 생성 완료"

# sitemap 압축 및 병합
echo "sitemap gzip 압축중"
node ./sitemap-compress.js
node ./sitemap.js
echo "sitemap 압축 완료"

# Google 서치콘솔에 sitemap 업데이트 핑 전송
# curl http://google.com/ping?sitemap=http://release.codeit.kr/sitemap.xml
# echo "Google에 sitemap 핑 전송"