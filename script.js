const PHONE_DISPLAY = "01023781330";
const PHONE_INTL = "+201023781330";
const WA_LINK = "https://wa.me/201023781330";

const services = [
  { ar: "نظافة الواجهات", en: "Facade Cleaning", icon: "🏢", desc: "تنظيف الزجاج والواجهات بأمان ونتيجة لامعة." },
  { ar: "النظافة الداخلية (شقق/فلل)", en: "Interior Cleaning", icon: "🏠", desc: "تنظيف شامل للمنازل مع اهتمام بالتفاصيل." },
  { ar: "تنظيف بعد التشطيب", en: "Post-Construction", icon: "🧱", desc: "إزالة الأتربة وبقايا التشطيب وتجهيز المكان للسكن." },
  { ar: "إزالة الأستيكر", en: "Sticker Removal", icon: "🧽", desc: "إزالة اللاصق والملصقات بدون خدوش أو آثار." },
  { ar: "تنظيف الأثاث والمفروشات", en: "Upholstery Cleaning", icon: "🛋️", desc: "إزالة البقع والروائح وتعقيم للمفروشات." },
  { ar: "تنظيف خزانات المياه", en: "Water Tank Cleaning", icon: "💧", desc: "تنظيف وتعقيم لضمان مياه أنظف وصحة أفضل." },
  { ar: "جلي وتلميع الرخام", en: "Marble Polishing", icon: "✨", desc: "استعادة لمعان الرخام ورفع كفاءة المظهر." },
  { ar: "التعقيم والمكافحة", en: "Sanitization & Pest", icon: "🦠", desc: "تعقيم فعّال ومكافحة آمنة حسب الحالة." },
  { ar: "تنظيف الشركات", en: "Office Cleaning", icon: "🏢", desc: "خدمات دورية للمكاتب والشركات بعقود مرنة." },
  { ar: "تنظيف المدارس", en: "School Cleaning", icon: "🎒", desc: "نظافة آمنة لبيئة تعليم صحية." },
  { ar: "تنظيف السجاد", en: "Carpet Cleaning", icon: "🧼", desc: "تنظيف عميق وإزالة البقع بنتائج واضحة." },
  { ar: "تنظيف هود المطاعم", en: "Hood Cleaning", icon: "🍽️", desc: "إزالة الدهون وتحسين الأمان وكفاءة الشفط." },
];

function buildServiceCard(s) {
  const callLink = `tel:${PHONE_INTL}`;
  const waText = encodeURIComponent(`مرحبًا Middle East Cleaning، عايز استفسر عن خدمة: ${s.ar} (${s.en}).`);
  const waLink = `${WA_LINK}?text=${waText}`;

  return `
    <div class="serviceCard">
      <div class="serviceCard__top">
        <div>
          <div class="serviceCard__title">${s.ar}</div>
          <div class="serviceCard__sub">${s.en}</div>
        </div>
        <div class="serviceCard__icon">${s.icon}</div>
      </div>
      <p class="serviceCard__desc">${s.desc}</p>
      <div class="serviceCard__actions">
        <a class="btn btn--ghost" href="${waLink}" target="_blank" rel="noreferrer">احجز واتساب</a>
        <a class="btn" href="${callLink}">اتصل الآن</a>
      </div>
    </div>
  `;
}

function initServices() {
  const grid = document.getElementById("servicesGrid");
  grid.innerHTML = services.map(buildServiceCard).join("");

  const select = document.getElementById("serviceSelect");
  select.innerHTML = `<option value="" disabled selected>اختر الخدمة</option>` + services
    .map(s => `<option value="${s.ar}">${s.ar} — ${s.en}</option>`)
    .join("");
}

function initMobileNav() {
  const burger = document.getElementById("burger");
  const mobileNav = document.getElementById("mobileNav");

  const setOpen = (open) => {
    burger.setAttribute("aria-expanded", String(open));
    mobileNav.style.display = open ? "flex" : "none";
    mobileNav.setAttribute("aria-hidden", String(!open));
  };

  let open = false;
  burger.addEventListener("click", () => {
    open = !open;
    setOpen(open);
  });

  mobileNav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      open = false;
      setOpen(open);
    });
  });

  setOpen(false);
}

function initFormToWhatsApp() {
  const form = document.getElementById("leadForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = (fd.get("name") || "").toString().trim();
    const phone = (fd.get("phone") || "").toString().trim();
    const service = (fd.get("service") || "").toString().trim();
    const notes = (fd.get("notes") || "").toString().trim();

    const msg =
`مرحبًا Middle East Cleaning 👋
الاسم: ${name}
رقمي: ${phone}
الخدمة: ${service}
ملاحظات: ${notes || "—"}
أريد عرض سعر / معاينة.`;

    const link = `${WA_LINK}?text=${encodeURIComponent(msg)}`;
    window.open(link, "_blank", "noopener,noreferrer");
  });
}

function initYear() {
  document.getElementById("year").textContent = new Date().getFullYear();
}

initServices();
initMobileNav();
initFormToWhatsApp();
initYear();
