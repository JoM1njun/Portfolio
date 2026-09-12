프로젝트 목업/이미지 사용법

1. 이 폴더에 이미지를 넣습니다.
   예: dtrip-mockup.png

2. script.js의 해당 프로젝트에서:
   image: "assets/dtrip-mockup.png"
   처럼 입력합니다.

3. 프로토타입/임베드가 가능한 서비스라면:
   embed: "임베드 URL"
   처럼 입력합니다.

embed가 image보다 우선 적용됩니다.
서비스가 iframe 임베딩을 막고 있으면 image 또는 외부 링크를 사용하세요.
