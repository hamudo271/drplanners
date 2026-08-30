import { Section, Media, BrassIcon, Button } from "@/components/ui";
import { PageHero } from "@/components/templates/shared";
import { ContactForm } from "@/components/contact/ContactForm";
import { CONTACT_HERO, cardImage } from "@/config/images";

export const metadata = {
  title: "CONTACT — 닥터플래너스",
  description: "병원 상황을 알려주시면 담당 플래너가 직접 검토 후 연락드립니다.",
};

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "contact" }]}
        title="CONTACT"
        lead="병원 상황을 알려주시면 담당 플래너가 직접 검토 후 연락드립니다."
        mediaLabel="컨택트 키비주얼"
        mediaSrc={CONTACT_HERO}
      />

      <Section no="01" label="Inquiry">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm />

          <aside className="space-y-8">
            <div className="border border-ink-900/15 p-6">
              <p className="label">바로 연락</p>
              <div className="mt-5 space-y-5">
                {[
                  { k: "대표번호", v: "문의 폼으로 남겨주시면 연락드립니다" },
                  { k: "이메일", v: "아래 폼이 담당자 메일로 바로 전달됩니다" },
                  { k: "응답 시간", v: "영업일 기준 1일 내 회신" },
                ].map((c) => (
                  <div key={c.k} className="flex items-start gap-3">
                    <BrassIcon size={28} />
                    <div className="flex-1">
                      <p className="label">{c.k}</p>
                      <p className="prose-ko mt-1.5 text-sm text-ink-500">{c.v}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-ink-900/15 bg-forest-800 p-6 text-cream-100">
              <p className="label label-on-dark">신규 수주 안내</p>
              <p className="prose-ko mt-3 text-sm text-cream-100/85">
                닥터플래너스는 월 최대 4개 병원만 새로 맡습니다. 동일 상권의
                동일 진료과는 중복해서 맡지 않습니다.
              </p>
            </div>

            <div className="border border-ink-900/15 p-6">
              <p className="label">진단부터 시작하기</p>
              <p className="mt-3 text-sm leading-relaxed">
                어떤 솔루션이 필요한지 아직 모르시겠다면
                <br />
                5분 진단을 먼저 받아보세요.
              </p>
              <a href="/diagnosis" className="mt-5 inline-block">
                <Button variant="outline">병원 진단 시작하기</Button>
              </a>
            </div>

            <Media
              label="오시는 길 이미지"
              ratio="aspect-[4/3]"
              src={cardImage(6)}
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <Media label="지도 임베드 자리" ratio="aspect-square" />
          </aside>
        </div>
      </Section>
    </>
  );
}
