/**
 * Ivory Horizons - Luxury Concierge Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const siteHeader = document.getElementById('siteHeader');
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.querySelector('.main-nav');
  
  const conciergeModal = document.getElementById('conciergeModal');
  const openConciergeHeaderBtn = document.getElementById('openConciergeHeaderBtn');
  const heroPrimaryCta = document.getElementById('heroPrimaryCta');
  const finalCtaBtn = document.getElementById('finalCtaBtn');
  const closeConciergeBtn = document.getElementById('closeConciergeBtn');
  
  const conciergeForm = document.getElementById('conciergeForm');
  const prevStepBtn = document.getElementById('prevStepBtn');
  const nextStepBtn = document.getElementById('nextStepBtn');
  const submitConciergeBtn = document.getElementById('submitConciergeBtn');
  
  const stepBadge = document.getElementById('stepBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const progressFill = document.getElementById('progressFill');
  
  const modalFooterNav = document.getElementById('modalFooterNav');
  const confirmationStep = document.getElementById('confirmationStep');
  const summaryRecap = document.getElementById('summaryRecap');
  const closeConfirmationBtn = document.getElementById('closeConfirmationBtn');

  // Background Theme Music Elements
  const bgMusic = document.getElementById('bgMusic');
  const playMusicBtn = document.getElementById('playMusicBtn');
  const playIcon = document.getElementById('playIcon');
  const playText = document.getElementById('playText');
  let isPlaying = false;

  // Background Theme Music Toggle
  if (playMusicBtn && bgMusic) {
    playMusicBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isPlaying) {
        bgMusic.play().then(() => {
          isPlaying = true;
          if (playIcon) playIcon.textContent = '⏸';
          if (playText) playText.textContent = 'Pause Theme Music';
        }).catch(err => {
          console.log("Audio playback error:", err);
        });
      } else {
        bgMusic.pause();
        isPlaying = false;
        if (playIcon) playIcon.textContent = '▶';
        if (playText) playText.textContent = 'Play Theme Music';
      }
    });
  }

  // State
  let currentStep = 1;
  const totalSteps = 4;

  const stepTitles = {
    1: {
      title: "What type of trip are you imagining?",
      subtitle: "Select the experience that best captures your dream African escape."
    },
    2: {
      title: "Which Iconic Horizons speak to you?",
      subtitle: "Choose one or more destinations you wish to explore."
    },
    3: {
      title: "Tell us about your travel parameters",
      subtitle: "Help us understand your preferred timing, group size, and investment level."
    },
    4: {
      title: "Where should your private curator reach out?",
      subtitle: "Provide your contact details to receive your bespoke travel proposal."
    }
  };

  // Sticky Header Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // Mobile Navigation Toggle
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });
  }

  // Concierge Modal Triggers
  function openConcierge(preselectType = null, preselectDest = null) {
    if (preselectType) {
      const radio = conciergeForm.querySelector(`input[name="journeyType"][value="${preselectType}"]`);
      if (radio) radio.checked = true;
    }

    if (preselectDest) {
      const checkbox = conciergeForm.querySelector(`input[name="destination"][value="${preselectDest}"]`);
      if (checkbox) checkbox.checked = true;
    }

    currentStep = 1;
    updateStepView();
    if (conciergeModal.showModal) {
      conciergeModal.showModal();
    } else {
      conciergeModal.setAttribute('open', 'true');
    }
  }

  function closeConcierge() {
    if (conciergeModal.close) {
      conciergeModal.close();
    } else {
      conciergeModal.removeAttribute('open');
    }
  }

  if (openConciergeHeaderBtn) openConciergeHeaderBtn.addEventListener('click', () => openConcierge());
  if (heroPrimaryCta) heroPrimaryCta.addEventListener('click', () => openConcierge());
  if (finalCtaBtn) finalCtaBtn.addEventListener('click', () => openConcierge());
  if (closeConciergeBtn) closeConciergeBtn.addEventListener('click', closeConcierge);
  if (closeConfirmationBtn) closeConfirmationBtn.addEventListener('click', closeConcierge);

  // Delegate for card triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.concierge-trigger');
    if (trigger) {
      e.preventDefault();
      const type = trigger.dataset.type || null;
      const dest = trigger.dataset.dest || null;
      openConcierge(type, dest);
    }
  });

  // Wizard Step Navigation
  function updateStepView() {
    // Hide all steps
    document.querySelectorAll('.concierge-step').forEach(step => {
      step.classList.remove('step-active');
      step.style.display = 'none';
    });

    if (currentStep <= totalSteps) {
      confirmationStep.style.display = 'none';
      modalFooterNav.style.display = 'flex';
      
      const activeStep = document.querySelector(`.concierge-step[data-step="${currentStep}"]`);
      if (activeStep) {
        activeStep.classList.add('step-active');
        activeStep.style.display = 'block';
      }

      // Update headers
      stepBadge.textContent = `Step ${currentStep} of ${totalSteps}`;
      modalTitle.textContent = stepTitles[currentStep].title;
      modalSubtitle.textContent = stepTitles[currentStep].subtitle;

      // Update progress bar
      progressFill.style.width = `${(currentStep / totalSteps) * 100}%`;

      // Update buttons
      prevStepBtn.style.display = currentStep > 1 ? 'inline-flex' : 'none';
      nextStepBtn.style.display = currentStep < totalSteps ? 'inline-flex' : 'none';
      submitConciergeBtn.style.display = currentStep === totalSteps ? 'inline-flex' : 'none';
    }
  }

  if (nextStepBtn) {
    nextStepBtn.addEventListener('click', () => {
      if (currentStep < totalSteps) {
        currentStep++;
        updateStepView();
      }
    });
  }

  if (prevStepBtn) {
    prevStepBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateStepView();
      }
    });
  }

  // Handle Form Submission
  if (conciergeForm) {
    conciergeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Gather form inputs
      const journeyType = conciergeForm.querySelector('input[name="journeyType"]:checked')?.value || 'Bespoke Journey';
      const destinations = Array.from(conciergeForm.querySelectorAll('input[name="destination"]:checked')).map(cb => cb.value);
      const travelDates = document.getElementById('travelDates').value || 'Flexible';
      const travelers = document.getElementById('travelersCount').value;
      const budget = document.getElementById('budgetRange').value;
      const guestName = document.getElementById('guestName').value || 'Valued Guest';

      // Build Summary
      summaryRecap.innerHTML = `
        <p><strong>Guest:</strong> ${guestName}</p>
        <p><strong>Journey Style:</strong> ${journeyType}</p>
        <p><strong>Destinations:</strong> ${destinations.length ? destinations.join(', ') : 'Curated Recommendation'}</p>
        <p><strong>Timing:</strong> ${travelDates} • <strong>Guests:</strong> ${travelers}</p>
        <p><strong>Investment Bracket:</strong> ${budget}</p>
      `;

      // Hide form steps & footer, show confirmation
      document.querySelectorAll('.concierge-step').forEach(step => step.style.display = 'none');
      modalFooterNav.style.display = 'none';
      stepBadge.textContent = 'Curated Request Received';
      modalTitle.textContent = 'Thank You';
      modalSubtitle.textContent = 'Your private concierge ticket has been created.';
      progressFill.style.width = '100%';
      
      confirmationStep.style.display = 'block';
    });
  }
});
