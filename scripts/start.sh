#!/bin/sh
# Railway 시작 스크립트 — DB 스키마를 최신으로 맞춘 뒤 서버를 띄웁니다.
#
# migrate 가 실패하거나 멈춰도 사이트는 떠야 합니다 (&& 로 묶지 않음).
# 공개 페이지는 DB 없이도 기존 글로 동작하고, 실패 내용은 배포 로그에 남습니다.
# CHECKPOINT_DISABLE: Prisma 업데이트 확인 요청이 프로세스를 붙잡는 일을 막습니다.

if [ -n "$DATABASE_URL" ]; then
  echo "[start] prisma migrate deploy"
  CHECKPOINT_DISABLE=1 timeout 90 ./node_modules/.bin/prisma migrate deploy \
    || echo "[start] migrate 실패 — 사이트는 계속 띄웁니다. 위 로그를 확인하세요."
else
  echo "[start] DATABASE_URL 없음 — 관리자 기능 없이 시작합니다."
fi

exec ./node_modules/.bin/next start -H 0.0.0.0 -p "${PORT:-3000}"
