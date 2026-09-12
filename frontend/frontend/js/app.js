```javascript
/* =========================================
   CyberGuard - Frontend Application
   ========================================= */

const API_BASE_URL =
    window.location.hostname.includes("-3001.")
        ? `${window.location.protocol}//${window.location.hostname.replace(
              "-3001.",
              "-8000."
          )}`
        : "http://127.0.0.1:8000";


/* =========================================
   DOM Elements
   ========================================= */

const healthBtn = document.getElementById("healthBtn");
const healthResult = document.getElementById("healthResult");


/* =========================================
   Health Check
   ========================================= */

async function checkBackendHealth() {

    if (!healthBtn || !healthResult) {
        return;
    }

    healthBtn.disabled = true;
    healthBtn.textContent = "Checking...";

    healthResult.className = "health-result";
    healthResult.textContent = "Connecting to CyberGuard backend...";

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

        healthResult.className =
            "health-result success";

        healthResult.textContent =
            `${data.service || "CyberGuard"} backend: ${
                data.status || "online"
            }`;

    } catch (error) {

        console.error(
            "CyberGuard backend error:",
            error
        );

        healthResult.className =
            "health-result error";

        healthResult.textContent =
            "Backend is not reachable yet.";

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
   Initial Application State
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
