```javascript
// =========================================
// CyberGuard Frontend
// =========================================

// اختبار تحميل JavaScript
alert("CyberGuard JavaScript is working!");


const API_BASE_URL =
    "https://shiny-space-disco-wr7xq9q9vq9q274w-8000.app.github.dev";


// =========================================
// System Health Check
// =========================================

const healthBtn =
    document.getElementById("healthBtn");

const healthResult =
    document.getElementById("healthResult");


async function checkBackendHealth() {

    if (!healthBtn || !healthResult) {

        console.error(
            "CyberGuard: Health elements not found."
        );

        return;
    }


    healthBtn.disabled = true;

    healthBtn.textContent =
        "Checking...";


    healthResult.className =
        "health-result";


    healthResult.textContent =
        "Connecting to CyberGuard backend...";


    try {

        const response = await fetch(
            `${API_BASE_URL}/api/health`,
            {
                method: "GET",

                headers: {
                    "Accept":
                        "application/json"
                }
            }
        );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }


        const data =
            await response.json();


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

    healthBtn.textContent =
        "Check System";
}


if (healthBtn) {

    healthBtn.addEventListener(
        "click",
        checkBackendHealth
    );

}


// =========================================
// Threat Detection
// =========================================

const analyzeThreatBtn =
    document.getElementById(
        "analyzeThreatBtn"
    );


const threatType =
    document.getElementById(
        "threatType"
    );


const threatResult =
    document.getElementById(
        "threatResult"
    );


// =========================================
// Threat Analysis Function
// =========================================

async function analyzeThreat() {

    console.log(
        "CyberGuard: Analyze Threat button clicked."
    );


    if (
        !analyzeThreatBtn ||
        !threatType ||
        !threatResult
    ) {

        console.error(
            "CyberGuard: Threat Detection elements not found."
        );

        return;
    }


    const selectedType =
        threatType.value;


    console.log(
        "Selected threat:",
        selectedType
    );


    analyzeThreatBtn.disabled =
        true;


    analyzeThreatBtn.textContent =
        "Analyzing...";


    threatResult.className =
        "threat-result";


    threatResult.innerHTML = `

        <div class="result-icon">
            🔍
        </div>

        <div>

            <strong>
                Analyzing security event...
            </strong>

            <p>
                CyberGuard threat detection engine
                is processing the event.
            </p>

        </div>

    `;


    try {

        console.log(
            "Sending request to:",
            `${API_BASE_URL}/api/threats/analyze`
        );


        const response =
            await fetch(
                `${API_BASE_URL}/api/threats/analyze`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Accept":
                            "application/json"
                    },

                    body:
                        JSON.stringify({
                            type:
                                selectedType
                        })
                }
            );


        console.log(
            "Backend response status:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }


        const data =
            await response.json();


        console.log(
            "CyberGuard Threat Result:",
            data
        );


        // =================================
        // Threat Detected
        // =================================

        if (data.detected) {

            threatResult.className =
                "threat-result detected";


            threatResult.innerHTML = `

                <div class="result-icon">
                    🚨
                </div>

                <div>

                    <strong>
                        Threat Detected
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

        }


        // =================================
        // Safe Event
        // =================================

        else {

            threatResult.className =
                "threat-result safe";


            threatResult.innerHTML = `

                <div class="result-icon">
                    🛡️
                </div>

                <div>

                    <strong>
                        No Significant Threat
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

        }


    } catch (error) {

        console.error(
            "CyberGuard Threat Analysis Error:",
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
                    Unable to connect to the
                    CyberGuard threat detection engine.
                </p>

                <small>
                    ${error.message}
                </small>

            </div>

        `;

    }


    analyzeThreatBtn.disabled =
        false;


    analyzeThreatBtn.textContent =
        "Analyze Threat";

}


// =========================================
// Threat Button Event
// =========================================

if (analyzeThreatBtn) {

    console.log(
        "CyberGuard: Threat button found."
    );


    analyzeThreatBtn.addEventListener(
        "click",
        analyzeThreat
    );

} else {

    console.error(
        "CyberGuard: Analyze Threat button NOT found."
    );

}


// =========================================
// Frontend Status
// =========================================

console.log(
    "================================="
);

console.log(
    "CyberGuard frontend initialized."
);

console.log(
    "CyberGuard API:",
    API_BASE_URL
);

console.log(
    "================================="
);
```
