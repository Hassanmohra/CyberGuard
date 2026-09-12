const API_BASE_URL =
    "https://shiny-space-disco-wr7xq9q9vq9q274w-8000.app.github.dev";


// ===============================
// System Health Check
// ===============================

const healthBtn = document.getElementById("healthBtn");
const healthResult = document.getElementById("healthResult");

async function checkBackendHealth() {

    if (!healthBtn || !healthResult) {
        console.error("CyberGuard: Health elements not found.");
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
            `${data.service || "CyberGuard"} backend: ${
                data.status || "online"
            }`;

    } catch (error) {

        console.error(
            "CyberGuard connection error:",
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


if (healthBtn) {
    healthBtn.addEventListener(
        "click",
        checkBackendHealth
    );
}


// ===============================
// Threat Detection
// ===============================

const analyzeThreatBtn =
    document.getElementById("analyzeThreatBtn");

const threatType =
    document.getElementById("threatType");

const threatResult =
    document.getElementById("threatResult");


async function analyzeThreat() {

    if (
        !analyzeThreatBtn ||
        !threatType ||
        !threatResult
    ) {
        console.error(
            "CyberGuard: Threat analysis elements not found."
        );

        return;
    }

    const selectedType =
        threatType.value;

    analyzeThreatBtn.disabled = true;

    analyzeThreatBtn.textContent =
        "Analyzing...";

    threatResult.className =
        "threat-result";

    threatResult.innerHTML = `
        <div class="result-icon">🔍</div>

        <div>
            <strong>Analyzing security event...</strong>

            <p>
                CyberGuard threat detection engine is processing the event.
            </p>
        </div>
    `;


    try {

        const response = await fetch(
            `${API_BASE_URL}/api/threats/analyze`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    "Accept":
                        "application/json"
                },

                body: JSON.stringify({
                    type: selectedType
                })
            }
        );


        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}`
            );
        }


        const data =
            await response.json();


        console.log(
            "Threat analysis result:",
            data
        );


        const icon =
            data.detected
                ? "🚨"
                : "🛡️";


        threatResult.className =
            data.detected
                ? "threat-result detected"
                : "threat-result safe";


        threatResult.innerHTML = `

            <div class="result-icon">
                ${icon}
            </div>

            <div>

                <strong>
                    ${
                        data.detected
                            ? "Threat Detected"
                            : "No Significant Threat"
                    }
                </strong>

                <p>
                    ${data.message}
                </p>

                <small>
                    Severity:
                    <strong>
                        ${data.severity}
                    </strong>
                </small>

            </div>

        `;


    } catch (error) {

        console.error(
            "Threat analysis error:",
            error
        );


        threatResult.className =
            "threat-result error";


        threatResult.innerHTML = `

            <div class="result-icon">
                ⚠️
            </div>

            <div>

                <strong>
                    Analysis Failed
                </strong>

                <p>
                    Unable to connect to the CyberGuard threat detection engine.
                </p>

            </div>

        `;
    }


    analyzeThreatBtn.disabled = false;

    analyzeThreatBtn.textContent =
        "Analyze Threat";
}


if (analyzeThreatBtn) {

    analyzeThreatBtn.addEventListener(
        "click",
        analyzeThreat
    );

}


console.log(
    "CyberGuard frontend initialized."
);

console.log(
    "Backend API:",
    API_BASE_URL
);
