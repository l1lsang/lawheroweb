export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20, lineHeight: 1.7 }}>

      <h1>개인정보처리방침</h1>

      <h2>1. 총칙</h2>
      <p>
        대연이엔씨(이하 “회사”)는 「개인정보 보호법」 등 관련 법령을 준수하며,
        이용자의 개인정보를 적법하고 안전하게 처리합니다.
        본 방침은 회사가 운영하는 법률 중개 플랫폼(이하 "서비스") 이용자의
        개인정보 처리에 관한 사항을 규정합니다.
      </p>

      <h2>2. 수집하는 개인정보의 항목 및 수집 방법</h2>

      <h3>가. 일반회원</h3>

      <p><strong>직접 가입</strong></p>
      <ul>
        <li>필수: 이메일주소, 비밀번호, 휴대전화번호, 회원 유형</li>
        <li>선택: 성별, 생년월일</li>
      </ul>

      <p><strong>소셜 계정 연동 가입</strong></p>

      <table border="1" cellPadding="8" style={{ width: "100%", marginBottom: 30 }}>
        <thead>
          <tr>
            <th>연동 수단</th>
            <th>필수 항목</th>
            <th>선택 항목</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>네이버</td>
            <td>고유 식별자, 이메일, 휴대전화번호</td>
            <td>이름, 닉네임, 프로필사진, 성별, 생년월일</td>
          </tr>
          <tr>
            <td>카카오</td>
            <td>카카오계정(이메일), 닉네임, 프로필사진, 전화번호</td>
            <td>성별, 출생연도</td>
          </tr>
          <tr>
            <td>Apple</td>
            <td>고유 식별자, 이메일, 휴대전화번호</td>
            <td>성별, 생년월일</td>
          </tr>
        </tbody>
      </table>

      <h3>나. 변호사회원</h3>

      <p><strong>가입 단계</strong></p>
      <ul>
        <li>이메일</li>
        <li>비밀번호</li>
        <li>이름</li>
        <li>생년월일</li>
        <li>성별</li>
        <li>휴대폰번호</li>
        <li>출신시험</li>
      </ul>

      <p><strong>자격 인증 단계</strong></p>

      <table border="1" cellPadding="8" style={{ width: "100%", marginBottom: 30 }}>
        <thead>
          <tr>
            <th>서류 종류</th>
            <th>수집 항목</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>변호사 등록 증명</td>
            <td>성명, 등록 상태, 사무소 명칭·소재지, 발급일</td>
          </tr>
          <tr>
            <td>변호사 신분증 사본</td>
            <td>등록번호, 발급번호, 성명, 생년월일</td>
          </tr>
          <tr>
            <td>대한변호사협회 즉시인증</td>
            <td>신분증 등록번호, 발급번호</td>
          </tr>
        </tbody>
      </table>

      <p>※ 자격 인증 서류는 승인 완료 즉시 파기됩니다.</p>

      <h3>다. 서비스 이용 단계</h3>

      <table border="1" cellPadding="8" style={{ width: "100%", marginBottom: 30 }}>
        <thead>
          <tr>
            <th>이용 단계</th>
            <th>수집 항목</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>법률 상담</td>
            <td>닉네임, 상담 요청 내역, 결제 내역</td>
          </tr>
          <tr>
            <td>변호사 선임</td>
            <td>이름, 휴대폰번호, 생년월일, 선임 요청 내역</td>
          </tr>
          <tr>
            <td>결제</td>
            <td>결제 수단 정보(카드 종류·일부 번호), 결제 일시·금액</td>
          </tr>
          <tr>
            <td>고객센터 문의</td>
            <td>이름, 연락처, 이메일, 문의 내용</td>
          </tr>
        </tbody>
      </table>

      <h3>라. 자동 수집 정보</h3>

      <ul>
        <li>기기 정보: OS, 기기 모델명, 기기 고유 식별자</li>
        <li>네트워크 정보: IP 주소</li>
        <li>이용 기록: 접속 일시, 서비스 이용 내역</li>
        <li>쿠키(Cookie): 이용자 설정에 따라 수집 여부 선택 가능</li>
      </ul>

      <h2>3. 개인정보의 처리 목적</h2>

      <ul>
        <li>회원 가입·관리 및 본인 확인</li>
        <li>서비스 제공 및 운영, 민원 처리</li>
        <li>부정 이용 방지 및 이용 제한 조치</li>
        <li>분쟁 조정을 위한 기록 보존</li>
        <li>서비스 개선을 위한 통계·분석</li>
        <li>마케팅·이벤트 정보 제공</li>
        <li>변호사 자격 확인</li>
      </ul>

      <h2>4. 개인정보의 처리 및 보유 기간</h2>

      <p>
        원칙적으로 회원 자격 유지 기간 동안 보유하며, 회원 탈퇴 시 지체 없이 파기합니다.
        다만 아래 항목은 관련 법령에 따라 일정 기간 보존합니다.
      </p>

      <table border="1" cellPadding="8" style={{ width: "100%", marginBottom: 30 }}>
        <thead>
          <tr>
            <th>보존 항목</th>
            <th>보존 근거</th>
            <th>보존 기간</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>서비스 접속 기록</td>
            <td>통신비밀보호법</td>
            <td>3개월</td>
          </tr>
          <tr>
            <td>소비자 불만·분쟁 처리 기록</td>
            <td>전자상거래 소비자보호법</td>
            <td>3년</td>
          </tr>
          <tr>
            <td>대금결제 기록</td>
            <td>전자상거래 소비자보호법</td>
            <td>5년</td>
          </tr>
          <tr>
            <td>표시·광고 기록</td>
            <td>전자상거래 소비자보호법</td>
            <td>6개월</td>
          </tr>
          <tr>
            <td>금융거래 관련 정보</td>
            <td>신용정보법</td>
            <td>금융거래 종료 후 5년</td>
          </tr>
        </tbody>
      </table>

      <h2>5. 개인정보의 파기 절차 및 방법</h2>

      <ul>
        <li>전자적 파일: 복원 불가능한 기술적 방법으로 영구 삭제</li>
        <li>출력물·서면: 분쇄 또는 소각</li>
      </ul>

      <h2>6. 개인정보의 제3자 제공</h2>

      <table border="1" cellPadding="8" style={{ width: "100%", marginBottom: 30 }}>
        <thead>
          <tr>
            <th>제공받는 자</th>
            <th>제공 항목</th>
            <th>이용 목적</th>
            <th>보유 기간</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>법무법인 또는 법률사무소</td>
            <td>휴대전화번호, 이름, 생년월일</td>
            <td>법률 상담 연결</td>
            <td>서비스 목적 달성 시까지</td>
          </tr>
          <tr>
            <td>주식회사 에스비마케팅</td>
            <td>휴대전화번호, 이름, 생년월일</td>
            <td>마케팅 및 이벤트 정보 제공</td>
            <td>2년</td>
          </tr>
        </tbody>
      </table>

      <h2>7. 개인정보 처리위탁</h2>

      <table border="1" cellPadding="8" style={{ width: "100%", marginBottom: 30 }}>
        <thead>
          <tr>
            <th>수탁자</th>
            <th>위탁 업무 내용</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>○○○ 주식회사</td>
            <td>가상 전화번호 발급</td>
          </tr>
          <tr>
            <td>○○○ 주식회사</td>
            <td>문자 메시지 발송</td>
          </tr>
          <tr>
            <td>○○○ 주식회사</td>
            <td>카카오톡 알림 발송</td>
          </tr>
          <tr>
            <td>○○○ 주식회사</td>
            <td>결제 처리</td>
          </tr>
          <tr>
            <td>○○○ 주식회사</td>
            <td>서비스 이용 데이터 분석</td>
          </tr>
        </tbody>
      </table>

      <h2>8. 정보주체의 권리</h2>

      <ul>
        <li>열람권</li>
        <li>정정·삭제권</li>
        <li>처리 정지권</li>
        <li>동의 철회권</li>
      </ul>

      <h2>9. 쿠키(Cookie) 운영 및 거부 방법</h2>

      <ul>
        <li>Chrome: 설정 → 개인정보 및 보안 → 쿠키</li>
        <li>Edge: 설정 → 쿠키 및 사이트 권한</li>
        <li>Safari: 환경설정 → 개인정보 보호</li>
      </ul>

      <h2>10. 개인정보의 안전성 확보 조치</h2>

      <ul>
        <li>기술적 조치: 개인정보 암호화, SSL/TLS</li>
        <li>관리적 조치: 접근 권한 관리, 정기 교육</li>
        <li>물리적 조치: 서버 및 보관 장소 출입 통제</li>
      </ul>

      <h2>11. 개인정보보호책임자</h2>

      <table border="1" cellPadding="8" style={{ width: "100%", marginBottom: 30 }}>
        <thead>
          <tr>
            <th>구분</th>
            <th>성명</th>
            <th>담당 부서</th>
            <th>전화번호</th>
            <th>이메일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>개인정보보호책임자</td>
            <td>○○○</td>
            <td>○○팀</td>
            <td>0000-0000</td>
            <td>example@email.com</td>
          </tr>
        </tbody>
      </table>

      <h2>12. 개인정보처리방침의 변경</h2>
      <p>
        본 방침을 개정하는 경우 시행 7일 전 공지사항을 통해 고지합니다.
        중요한 변경 사항은 시행 30일 전에 고지합니다.
      </p>

      <h2>13. 권리 구제 기관</h2>

      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>기관</th>
            <th>연락처</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>개인정보 침해신고센터</td>
            <td>118 (privacy.kisa.or.kr)</td>
          </tr>
          <tr>
            <td>개인정보 분쟁조정위원회</td>
            <td>1833-6972 (www.kopico.go.kr)</td>
          </tr>
          <tr>
            <td>대검찰청 사이버수사과</td>
            <td>1301 (www.spo.go.kr)</td>
          </tr>
          <tr>
            <td>경찰청 사이버범죄 신고시스템</td>
            <td>182 (ecrm.cyber.go.kr)</td>
          </tr>
        </tbody>
      </table>
<div style={{ marginTop: 40, textAlign: "center" }}>

  <a
    href="/privacy-policy.pdf"
    download
    style={{
      display: "inline-block",
      padding: "12px 20px",
      background: "#111827",
      color: "white",
      borderRadius: 8,
      textDecoration: "none",
      fontWeight: "600"
    }}
  >
    상세 항목 PDF 다운로드
  </a>

</div>
    </div>
  );
}