
(() => {
  const section = document.getElementById("weddingCountdown");
  if (!section) return;

  const daysEl = section.querySelector("#countDays");
  const hoursEl = section.querySelector("#countHours");
  const minutesEl = section.querySelector("#countMinutes");
  const secondsEl = section.querySelector("#countSeconds");
  const closingEl = section.querySelector("#countdownClosing");

  // 5 December 2026, 12:17 PM Indian Standard Time
  const weddingTime = new Date(
    "2026-12-05T12:17:00+05:30"
  ).getTime();

  let timer;

  function updateCountdown() {
    const remaining = weddingTime - Date.now();

    if (remaining <= 0) {
      daysEl.textContent = "000";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";

      closingEl.textContent = "The wedding celebration is here!";

      clearInterval(timer);
      return;
    }

    const totalSeconds = Math.floor(remaining / 1000);

    daysEl.textContent = String(
      Math.floor(totalSeconds / 86400)
    ).padStart(3, "0");

    hoursEl.textContent = String(
      Math.floor((totalSeconds % 86400) / 3600)
    ).padStart(2, "0");

    minutesEl.textContent = String(
      Math.floor((totalSeconds % 3600) / 60)
    ).padStart(2, "0");

    secondsEl.textContent = String(
      totalSeconds % 60
    ).padStart(2, "0");
  }

  updateCountdown();
  timer = setInterval(updateCountdown, 1000);
})();
