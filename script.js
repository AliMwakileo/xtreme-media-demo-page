/**
 * ===================================================================
 * DEVELOPER CONFIGURATION: SWAP CLIENT DETAILS HERE BEFORE GOING LIVE
 * ===================================================================
 */
const BUSINESS_CONFIG = {
    businessName: "Xtreme Media",
    // Replace with Xtreme Media's real WhatsApp number (Format: 2547XXXXXXXX, no '+' sign)
    whatsappNumber: "254715427350",
    locationText: "Xtreme Media - Ground Floor, Crystal Business Plaza (Near Tumaini Stage, Off Magadi Road), Ongata Rongai"
};

const modal = document.getElementById('inquiryModal');
const topicInput = document.getElementById('inquiryTopic');
const detailsInput = document.getElementById('inquiryDetails');

// Open modal pre-filled with the selected category
function openInquiryModal(category) {
    topicInput.value = category;
    detailsInput.value = '';
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => detailsInput.focus(), 100);
}

// Close modal
function closeInquiryModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Build WhatsApp URL and launch
function sendWhatsAppInquiry() {
    const topic = topicInput.value.trim();
    const customNote = detailsInput.value.trim();

    let message = `Hello ${BUSINESS_CONFIG.businessName}! I found your page online.\n\n*Inquiry:* ${topic}`;
    if (customNote) {
        message += `\n*Details:* ${customNote}`;
    }
    message += `\n\nAre you open and do you have this available at Crystal Business Plaza?`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    closeInquiryModal();
}

// Copy shop address to clipboard using fallback-safe method
function copyAddress() {
    const tempInput = document.createElement('textarea');
    tempInput.value = BUSINESS_CONFIG.locationText;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
        document.execCommand('copy');
        showToast("Location copied! Ready to paste in WhatsApp or Maps.");
    } catch (err) {
        showToast("Crystal Business Plaza, Ground Floor, Ongata Rongai.");
    }
    document.body.removeChild(tempInput);
}

// Show subtle toast message
function showToast(text) {
    const toast = document.getElementById('toastNotification');
    toast.textContent = text;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Close modal on outside click
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeInquiryModal();
    }
});
