```javascript
const healthBtn = document.getElementById("healthBtn");
const healthResult = document.getElementById("healthResult");

async function checkBackendHealth() {
    healthBtn.disabled = true;
    healthBtn.textContent = "Checking...";

    healthResult.className = "health-result";
    healthResult.textContent = "Connecting to CyberGuard backend...";

    try {
        const response = await fetch(
            "https://shiny-space-disco-wr7xq9q9vq9q274w-8000.app.github.dev/api/health",
            {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        healthResult.className = "health-result success";

        healthResult.textContent =
            `${data.service} backend: ${data.status}`;

    } catch (error) {
        console.error("CyberGuard error:", error);

        healthResult.className = "health-result error";

        healthResult.textContent =
            "Backend connection failed.";
    }

    healthBtn.disabled = false;
    healthBtn.textContent = "Check System";
}

healthBtn.addEventListener("click", checkBackendHealth);
```
