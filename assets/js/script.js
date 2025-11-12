const translations = {
  en: {
    submit: "Submit",
    cta: "Share your voice anonymously",
    confirmation: "Your submission has been received.",
    error: "Something went wrong. Please try again.",
    language: "Language",
    submission: "Type of Submission",
    options: ["Feedback", "Report", "Request"]
  },
  my: {
    submit: "တင်ပြရန်",
    cta: "သင်၏အသံကိုမျှဝေပါ",
    confirmation: "သင်၏တင်ပြချက်ကိုလက်ခံပြီးပါပြီ။",
    error: "ထပ်မံကြိုးစားပါ။",
    language: "ဘာသာစကား",
    submission: "တင်ပြမှုအမျိုးအစား",
    options: ["တုံ့ပြန်ချက်", "အစီရင်ခံစာ", "တောင်းဆိုချက်"]
  },
  shn: {
    submit: "ပိုၼ်ၽႄတင်းႁင်",
    cta: "ၵႂၢမ်းတင်ပိုၼ်ၽႄတင်းႁင်ထိုင်",
    confirmation: "လၢႆႈႁပ်ႉဢဝ်တင်းႁင်ထိုင်ယဝ်ႉၶႃႈ။",
    error: "Error",
    language: "ၽႃႇသႃႇ",
    submission: "Type of Submission",
    options: ["Feedback", "Report", "Request"]
  }
};

const languageToggle = document.getElementById("languageToggle");
const submitBtn = document.getElementById("submitBtn");
const ctaText = document.getElementById("ctaText");
const confirmationMsg = document.getElementById("confirmationMsg");
const errorMsg = document.getElementById("errorMsg");
const languageLabel = document.getElementById("languageLabel");
const submissionLabel = document.getElementById("submissionLabel");
const submissionSelect = document.getElementById("submissionSelect");

function applyTranslations(lang) {
  const t = translations[lang];
  submitBtn.textContent = t.submit;
  ctaText.textContent = t.cta;
  confirmationMsg.textContent = t.confirmation;
  errorMsg.textContent = t.error;
  languageLabel.textContent = t.language;
  submissionLabel.textContent = t.submission;
  submissionSelect.innerHTML = t.options.map((opt, i) =>
    `<option value="${['feedback','report','request'][i]}">${opt}</option>`
  ).join("");
}

languageToggle.addEventListener("change", (e) => {
  applyTranslations(e.target.value);
});

applyTranslations(languageToggle.value);

document.getElementById("feedbackForm").addEventListener("submit", function(e) {
  const honeypot = document.getElementById("honeypot").value;
  if (honeypot !== "") {
    e.preventDefault();
    errorMsg.style.display = "block";
    errorMsg.textContent = "Bot detected.";
    return;
  }
  confirmationMsg.style.display = "block";
  errorMsg.style.display = "none";
});

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}

const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
