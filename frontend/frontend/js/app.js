const API_BASE_URL =
    "https://shiny-space-disco-wr7xq9q9vq9q274w-8000.app.github.dev";

const healthBtn = document.getElementById("healthBtn");
const healthResult = document.getElementById("healthResult");


// ========================================
// Backend Health Check
// ========================================

async function checkBackendHealth() {

    if (!healthBtn || !healthResult) {
        console.error("CyberGuard: Required elements not found.");
        return;
    }

    healthBtn.disabled = true;
    healthBtn.textContent = "Checking...";

    healthResult.className = "health-result";
    healthResult.textContent =
        "Connecting to CyberGuard backend...";

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/health`
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        healthResult.className =
            "health-result success";

        healthResult.textContent =
            `${data.service} backend: ${data.status}`;

    } catch (error) {

        console.error(
            "CyberGuard health error:",
            error
        );

        healthResult.className =
            "health-result error";

        healthResult.textContent =
            "Backend connection failed.";
    }

    healthBtn.disabled = false;
    healthBtn.textContent = "Check System";
}


// ========================================
// Real Dashboard Data
// ========================================

async function loadDashboard() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/dashboard`
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        console.log(
            "CyberGuard Dashboard:",
            data
        );

        /*
         * نبحث عن عناصر Dashboard الموجودة
         * في الصفحة ونحدّثها بالبيانات الحقيقية.
         */

        updateDashboardValue(
            "threats",
            data.threats
        );

        updateDashboardValue(
            "critical",
            data.critical
        );

        updateDashboardValue(
            "high",
            data.high
        );

        updateDashboardValue(
            "medium",
            data.medium
        );

        updateDashboardValue(
            "safe_events",
            data.safe_events
        );

        updateDashboardValue(
            "security_score",
            data.security_score
        );

        console.log(
            "CyberGuard: Dashboard updated successfully."
        );

    } catch (error) {

        console.error(
            "CyberGuard dashboard error:",
            error
        );
    }
}


// ========================================
// Update Dashboard Element
// ========================================

function updateDashboardValue(
    name,
    value
) {

    const element =
        document.querySelector(
            `[data-dashboard="${name}"]`
        );

    if (element) {
        element.textContent = value;
    }
}


// ========================================
// Events
// ========================================

if (healthBtn) {

    healthBtn.addEventListener(
        "click",
        checkBackendHealth
    );
}


// ========================================
// Start CyberGuard
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "CyberGuard frontend initialized."
        );

        loadDashboard();

    }
);
