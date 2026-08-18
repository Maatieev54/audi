import Seo, { BreadcrumbJsonLd } from '@/components/Seo'
import { COMPANY } from '@/data/site'
const LEAD = `“${COMPANY.legalName}” 2019-cu ildən Audi markalı avtomobillərin rəsmi idxalçısı kimi fəaliyyət göstərir.`
const PARAGRAPHS_TOP = [
  'Audi — mərkəzi İnqolştadt (Bavariya, Almaniya) şəhərində yerləşən alman avtomobil istehsalçısıdır və Volkswagen qrupunun tərkibinə daxildir.',
  'Brendin kökü mühəndis Avqust Horxun fəaliyyətinə gedib çıxır. 1899-cu ildə öz şirkətini quran Horx 1909-cu ildə ortaqlarından ayrılır və yeni müəssisə yaradır. Hüquqi səbəblərdən öz soyadını marka kimi işlədə bilmədiyi üçün alman dilində “dinlə” mənasını verən “horch” sözünü latın dilindəki qarşılığı ilə əvəz edir — beləliklə “Audi” adı yaranır.',
  'Loqodaki dörd halqa 1932-ci ilə aiddir. Həmin il Audi, Horch, DKW və Wanderer şirkətləri birləşərək Auto Union konsernini qurur; hər halqa bu dörd şirkətdən birini təmsil edir və simvol bu gün də saxlanılır.',
]
const PARAGRAPHS_BOTTOM = [
  'İkinci Dünya Müharibəsindən sonra şirkət uzun müddət DKW markası altında istehsalı davam etdirir. 1965-ci ildə Audi adı yenidən əsas marka kimi bazara qaytarılır və brend müasir inkişaf mərhələsinə başlayır.',
  '1980-ci ildə təqdim olunan quattro modeli brendin dönüş nöqtəsi olur — tam ötürücü sistem ilk dəfə seriyalı minik avtomobilində geniş istifadəyə verilir. Bu texnologiya sonradan ralli yarışlarında Audi-yə üstünlük qazandırır və avtomobil sənayesində standarta çevrilir.',
  '1994-cü ildə təqdim edilən A8 modeli alüminium konstruksiyalı gövdə ilə diqqət çəkir və yüngül material texnologiyasında yeni istiqamət açır. 2000-ci illərdə isə Audi Le Mans-ın 24 saatlıq dözümlülük yarışında bir sıra qələbələr qazanır.',
  'Azərbaycanda brendin rəsmi təmsilçiliyini “Dream Auto” MMC həyata keçirir. Şirkət Audi modellərinin satışı, zəmanət xidməti və satışdan sonrakı texniki dəstəyi Bakıdaki mərkəzi vasitəsilə təmin edir.',
]

export default function About() {
  return (
    <>
      <Seo
        title="Haqqımızda"
        description={`${COMPANY.legalName} — Audi AG-nin Azərbaycandaki eksklüziv idxalçısı. Şirkət haqqında məlumat və Audi brendinin tarixi.`}
        image="/images/about.webp"
      />
      <BreadcrumbJsonLd items={[{ name: 'Haqqımızda', to: '/about' }]} />
      <article className="mx-auto w-full max-w-[1200px] px-5 py-[100px] text-[14.4px] leading-[2]">

        <h1 className="m-0 text-[28.8px] font-bold tracking-normal">Haqqımızda</h1>
        <p className="mt-[17px] text-[16.85px] font-bold">{LEAD}</p>
        <div className="mt-[14.4px] space-y-[14.4px]">
          {PARAGRAPHS_TOP.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <img
          src="/images/about.webp"
          alt="Audi brendinin tarixi modeli"
          loading="lazy"
          className="mx-auto my-[60px] block w-full max-w-[800px] rounded-[10px]"
        />

        <div className="space-y-[14.4px]">
          {PARAGRAPHS_BOTTOM.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>
    </>
  )
}
