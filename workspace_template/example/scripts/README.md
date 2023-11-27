# 로컬 빌드 후 docker 실행

```
docker run --platform=linux/amd64 -d -p 4000:4000 vling_gui_v2:local npm run dist -- local
```
