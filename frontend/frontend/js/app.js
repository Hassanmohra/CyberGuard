```javascript
/* =========================================
   CyberGuard - Frontend Application
   ========================================= */

// رابط الـ Backend على GitHub Codespaces
const API_BASE_URL =
    "https://shiny-space-disco-wr7xq9q9vq9q274w-8000.app.github.dev";


/* =========================================
   DOM Elements
   ========================================= */

const healthBtn = document.getElementById("healthBtn");
const healthResult = document.getElementById("healthResult");


/* =========================================
   Backend Health Check
   ========================================= */

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
            `${API_BASE_URL}/api/health`,
            {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error(
                `Backend returned HTTP ${response.status}`
            );
        }

        const data = await response.json();

        console.log(
            "CyberGuard backend response:",
            data
        );

        healthResult.className =
            "health-result success";

        healthResult.textContent =
            `${data.service || "CyberGuard"} backend: ${
                data.status || "online"
            }`;

    } catch (error) {

        console.error(
            "CyberGuard backend connection error:",
            error
        );

        healthResult.className =
            "health-result error";

        healthResult.textContent =
            "Backend connection failed.";

    } finally {

        healthBtn.disabled = false;
        healthBtn.textContent = "Check System";

    }
}


/* =========================================
   Button Event
   ========================================= */

if (healthBtn) {

    healthBtn.addEventListener(
        "click",
        checkBackendHealth
    );

}


/* =========================================
   Application Initialization
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "CyberGuard frontend initialized."
        );

        console.log(
            "Backend API:",
            API_BASE_URL
        );

    }
);
```
