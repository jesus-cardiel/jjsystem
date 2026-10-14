/**
 * jjsystem Interactive AI Virtual Assistant (Chatbot)
 * Handles automatic query answering, quick chips, typing indicators, and human escalation to WhatsApp.
 */

(function () {
    const config = window.JJBotConfig || {
        lang: 'es',
        whatsappNumber: '584160108329'
    };

    const isEs = config.lang === 'es';

    // Knowledge Base & Responses
    const KB = {
        es: {
            welcome: "¡Hola! 👋 Soy **JJBot**, el asistente virtual de **jjsystem**.<br><br>¿En qué puedo ayudarte hoy? Puedes elegir una de las opciones rápidas o escribirme directamente tu duda.",
            chips: [
                { id: 'services', label: '🛠️ Servicios que ofrecen' },
                { id: 'times', label: '⏱️ Tiempos de entrega' },
                { id: 'pricing', label: '💰 Precios y presupuestos' },
                { id: 'support', label: '🛡️ Soporte y garantía' },
                { id: 'advisor', label: '👨‍💼 Hablar con un asesor', isWa: true }
            ],
            answers: {
                services: "En **jjsystem** ofrecemos soluciones digitales integrales:<br>• **Desarrollo Web a Medida** (Front & Backend)<br>• **Diseño UI/UX** moderno y responsivo<br>• **Tiendas Online (E-commerce)** con pagos seguros<br>• **Optimización SEO** y presencia en Google<br>• **Cloud Hosting Administrado** y soporte continuo.<br><br>¿Te gustaría cotizar alguno de estos servicios?",
                times: "⏱️ **Tiempos estimados de desarrollo:**<br>• **Web informativa o Landing Page:** 2 a 3 semanas.<br>• **Tienda Online (E-commerce):** 4 a 8 semanas.<br>• **Sistemas y Apps a Medida:** Según los requerimientos específicos.<br><br>Trabajamos con cronogramas claros y entregas por fases para que sigas el avance paso a paso.",
                pricing: "💰 **Cotizaciones personalizadas:**<br>Cada proyecto tiene necesidades únicas, por lo que adaptamos el presupuesto a las funcionalidades exactas que necesitas, garantizando la mejor relación calidad-precio.<br><br>¡La cotización es **100% gratuita y sin compromiso**!",
                support: "🛡️ **Garantía y Soporte Continuo:**<br>¡Sí! Todos nuestros desarrollos incluyen soporte técnico post-lanzamiento, manuales de usuario y mantenimiento para asegurar que tu plataforma opere al 100% de forma segura.",
                portfolio: "🚀 Puedes ver nuestros proyectos más recientes en la sección **Portafolio** de la página web (sistemas de gestión, plataformas web interactivas y tickets de soporte). ¿Deseas ver una demostración en vivo con un asesor?",
                greetings: "¡Hola! Un gusto saludarte. 😊 ¿En qué proyecto o idea digital estás pensando hoy?",
                advisor: "👨‍💼 **Transferencia con un Asesor Humano:**<br>Nuestro equipo de asesores está listo para brindarte atención personalizada, resolver dudas técnicas o enviarte una cotización formal.",
                fallback: "Para darte la información exacta sobre tu consulta, lo ideal es conectarte directamente con uno de nuestros asesores especializados. Puedes continuar la conversación por WhatsApp con solo un clic:"
            },
            escalateTitle: "Atención inmediata por WhatsApp",
            escalateBtn: "Chatear con un Asesor Humano",
            defaultWaMsg: "Hola jjsystem, estaba usando el asistente virtual de la página web y deseo hablar con un asesor.",
            queryWaMsg: "Hola jjsystem, estaba en su web consultando sobre: "
        },
        en: {
            welcome: "Hello! 👋 I'm **JJBot**, the virtual assistant of **jjsystem**.<br><br>How can I help you today? You can choose one of the quick options or type your question directly.",
            chips: [
                { id: 'services', label: '🛠️ Services offered' },
                { id: 'times', label: '⏱️ Project timelines' },
                { id: 'pricing', label: '💰 Pricing & quotes' },
                { id: 'support', label: '🛡️ Support & warranty' },
                { id: 'advisor', label: '👨‍💼 Talk to an advisor', isWa: true }
            ],
            answers: {
                services: "At **jjsystem** we provide complete digital solutions:<br>• **Custom Web Development** (Full-Stack)<br>• Modern & Responsive **UI/UX Design**<br>• **E-commerce Stores** with secure payments<br>• **SEO Optimization** for Google rankings<br>• **Managed Cloud Hosting** and continuous updates.<br><br>Would you like to get a quote for any of these?",
                times: "⏱️ **Estimated delivery times:**<br>• **Standard / Landing Website:** 2 to 3 weeks.<br>• **E-commerce Platform:** 4 to 8 weeks.<br>• **Custom Web Applications:** Based on specifications.<br><br>We work with clear milestones and live progress reviews.",
                pricing: "💰 **Custom Quotes:**<br>Every project has unique requirements. We tailor budgets to the exact features you need, delivering maximum return on investment.<br><br>Quotes are **100% free with no obligation**!",
                support: "🛡️ **Warranty & Post-Launch Support:**<br>Yes! All our projects include technical support, guidance, and maintenance to keep your site running smoothly and securely.",
                portfolio: "🚀 You can check out our recent projects in the **Portfolio** section of this website. Would you like a live demo or case study with an advisor?",
                greetings: "Hello! Great to connect with you. 😊 What kind of digital project are you planning?",
                advisor: "👨‍💼 **Connect with a Human Advisor:**<br>Our team is available to offer personalized guidance, technical consultations, and detailed quotes.",
                fallback: "To provide you with the most accurate details for your query, let me connect you directly with one of our specialized advisors via WhatsApp:"
            },
            escalateTitle: "Instant WhatsApp Support",
            escalateBtn: "Chat with a Human Advisor",
            defaultWaMsg: "Hello jjsystem, I was using the virtual assistant on your website and would like to chat with an advisor.",
            queryWaMsg: "Hello jjsystem, I was on your website inquiring about: "
        }
    };

    const currentTexts = isEs ? KB.es : KB.en;

    // Build Chatbot HTML
    function initChatbotDOM() {
        if (document.getElementById('chatbotContainer')) return;

        const container = document.createElement('div');
        container.id = 'chatbotContainer';
        container.innerHTML = `
            <!-- Chatbot Window -->
            <div class="chatbot-window" id="chatbotWindow">
                <div class="chatbot-header">
                    <div class="d-flex align-items-center">
                        <div class="chatbot-avatar">
                            <img src="img/bot-avatar.jpg" alt="JJBot AI" class="chatbot-avatar-img">
                            <span class="chatbot-avatar-status"></span>
                        </div>
                        <div class="chatbot-header-info">
                            <h4 class="chatbot-header-title">JJBot <span class="badge bg-purple ms-1" style="font-size:0.6rem;">AI</span></h4>
                            <p class="chatbot-header-subtitle">
                                <i class="bi bi-circle-fill" style="font-size: 6px;"></i> ${isEs ? 'En línea • Asistencia Inmediata' : 'Online • Instant Support'}
                            </p>
                        </div>
                    </div>
                    <div class="chatbot-header-actions">
                        <a href="https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(currentTexts.defaultWaMsg)}" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           class="chatbot-header-btn wa-btn" 
                           title="${isEs ? 'Abrir WhatsApp' : 'Open WhatsApp'}"
                           id="chatbotHeaderWaBtn">
                            <i class="bi bi-whatsapp"></i>
                        </a>
                        <button class="chatbot-header-btn" id="chatbotCloseBtn" title="${isEs ? 'Cerrar chat' : 'Close chat'}">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                </div>

                <div class="chatbot-body" id="chatbotBody">
                    <!-- Messages will be rendered here -->
                </div>

                <!-- Quick suggestion chips -->
                <div class="chatbot-quick-chips" id="chatbotQuickChips">
                    ${currentTexts.chips.map(chip => `
                        <button type="button" class="chatbot-chip ${chip.isWa ? 'wa-chip' : ''}" data-chip-id="${chip.id}">
                            ${chip.label}
                        </button>
                    `).join('')}
                </div>

                <div class="chatbot-footer">
                    <form class="chatbot-form" id="chatbotForm">
                        <input type="text" class="chatbot-input" id="chatbotInput" 
                               placeholder="${isEs ? 'Escribe tu pregunta o duda...' : 'Type your question here...'}" 
                               autocomplete="off">
                        <button type="submit" class="chatbot-send-btn" id="chatbotSendBtn" aria-label="Enviar">
                            <i class="bi bi-send-fill"></i>
                        </button>
                    </form>
                </div>
            </div>

            <!-- Launcher Button with 3D Robot Avatar -->
            <div class="chatbot-launcher-container" id="chatbotLauncherContainer">
                <div class="chatbot-tooltip d-none d-md-flex" id="chatbotLauncherTooltip">
                    <span class="online-indicator"></span>
                    <span>${isEs ? '¿Dudas? Chatea con nosotros' : 'Questions? Chat with us'}</span>
                </div>
                <button type="button" class="chatbot-launcher-btn" id="chatbotLauncherBtn" aria-label="Abrir Asistente">
                    <img src="img/bot-avatar.jpg" alt="JJBot AI" class="chatbot-avatar-img" id="chatbotLauncherAvatar">
                    <div class="chatbot-launcher-close-icon"><i class="bi bi-x-lg"></i></div>
                    <span class="chatbot-wa-badge" title="WhatsApp Asesores"><i class="bi bi-whatsapp"></i></span>
                    <span class="chatbot-launcher-pulse"></span>
                </button>
            </div>
        `;

        document.body.appendChild(container);

        // Hide legacy static button if present to prevent overlap
        const legacyWa = document.querySelector('.whatsapp-float-container');
        if (legacyWa) {
            legacyWa.style.display = 'none';
        }

        bindEvents();
        loadInitialMessages();
    }

    // Format current time
    function getNowTime() {
        const d = new Date();
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Append Message to UI
    function appendMessage(text, sender = 'bot', withEscalation = false, userQuery = '') {
        const body = document.getElementById('chatbotBody');
        if (!body) return;

        const msgDiv = document.createElement('div');
        msgDiv.className = `chatbot-msg ${sender}`;

        let escalationHtml = '';
        if (withEscalation) {
            const waText = userQuery 
                ? `${currentTexts.queryWaMsg}"${userQuery}"` 
                : currentTexts.defaultWaMsg;
            const waUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(waText)}`;

            escalationHtml = `
                <div class="chatbot-escalate-card">
                    <span class="chatbot-escalate-title">
                        <i class="bi bi-whatsapp"></i> ${currentTexts.escalateTitle}
                    </span>
                    <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="chatbot-wa-action-btn chatbot-track-wa">
                        <i class="bi bi-chat-text-fill"></i> ${currentTexts.escalateBtn}
                    </a>
                </div>
            `;
        }

        if (sender === 'bot') {
            msgDiv.innerHTML = `
                <img src="img/bot-avatar.jpg" alt="JJBot" class="chatbot-msg-avatar-thumb">
                <div class="chatbot-msg-inner">
                    <div class="chatbot-bubble">
                        ${text}
                        ${escalationHtml}
                    </div>
                    <span class="chatbot-msg-time">${getNowTime()}</span>
                </div>
            `;
        } else {
            msgDiv.innerHTML = `
                <div class="chatbot-bubble">
                    ${text}
                </div>
                <span class="chatbot-msg-time">${getNowTime()}</span>
            `;
        }

        body.appendChild(msgDiv);
        body.scrollTop = body.scrollHeight;

        // Attach GA tracking to generated button
        msgDiv.querySelectorAll('.chatbot-track-wa').forEach(el => {
            el.addEventListener('click', () => trackEvent('chatbot_whatsapp_escalate', 'Chatbot WA Escalation'));
        });
    }

    // Typing simulation
    function showTyping() {
        const body = document.getElementById('chatbotBody');
        if (!body) return null;

        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-msg bot';
        typingDiv.id = 'chatbotTypingIndicator';
        typingDiv.innerHTML = `
            <img src="img/bot-avatar.jpg" alt="JJBot" class="chatbot-msg-avatar-thumb">
            <div class="chatbot-typing">
                <span class="chatbot-typing-dot"></span>
                <span class="chatbot-typing-dot"></span>
                <span class="chatbot-typing-dot"></span>
            </div>
        `;
        body.appendChild(typingDiv);
        body.scrollTop = body.scrollHeight;
        return typingDiv;
    }

    function removeTyping() {
        const typing = document.getElementById('chatbotTypingIndicator');
        if (typing) typing.remove();
    }

    // Process user query
    function processQuery(query) {
        const q = query.toLowerCase().trim();
        const answers = currentTexts.answers;

        // Check Greetings
        if (/^(hola|buen|que tal|hey|hi|hello|saludos)/i.test(q)) {
            return { text: answers.greetings, escalate: false };
        }

        // Check Services
        if (/servicio|que hacen|que ofrecen|desarrollo|diseno|diseño|pagina|sitio|tienda|ecommerce|e-commerce|hosting|seo|services/i.test(q)) {
            return { text: answers.services, escalate: true };
        }

        // Check Delivery Times
        if (/tiempo|tardan|demora|cuanto tiempo|plazo|entrega|fecha|cuanto tarda|duration|how long|timeline/i.test(q)) {
            return { text: answers.times, escalate: true };
        }

        // Check Pricing / Quotes
        if (/precio|costo|cuanto cuesta|presupuesto|cotiz|tarifa|valor|cuanto vale|price|cost|quote|budget/i.test(q)) {
            return { text: answers.pricing, escalate: true };
        }

        // Check Support / Warranty
        if (/soporte|garantia|mantenimiento|actualiz|despues|post|support|warranty|maintenance/i.test(q)) {
            return { text: answers.support, escalate: true };
        }

        // Check Portfolio / Previous works
        if (/portafolio|proyecto|trabajo|cliente|ejemplo|portfolio|project|case study/i.test(q)) {
            return { text: answers.portfolio, escalate: true };
        }

        // Check Advisor / Human
        if (/asesor|humano|persona|contacto|telefono|whatsapp|llamar|hablar|advisor|human|agent|call/i.test(q)) {
            return { text: answers.advisor, escalate: true };
        }

        // Fallback for general questions
        return { text: answers.fallback, escalate: true };
    }

    function handleUserInput(userText) {
        if (!userText.trim()) return;

        // Display user message
        appendMessage(userText, 'user');
        trackEvent('chatbot_message_sent', userText.substring(0, 50));

        // Show typing indicator
        showTyping();

        // Process response with realistic delay
        setTimeout(() => {
            removeTyping();
            const result = processQuery(userText);
            appendMessage(result.text, 'bot', result.escalate, userText);
        }, 550);
    }

    function handleChipClick(chipId) {
        const answers = currentTexts.answers;
        let response = '';
        let isEscalate = false;

        switch (chipId) {
            case 'services':
                response = answers.services;
                isEscalate = true;
                break;
            case 'times':
                response = answers.times;
                isEscalate = true;
                break;
            case 'pricing':
                response = answers.pricing;
                isEscalate = true;
                break;
            case 'support':
                response = answers.support;
                isEscalate = true;
                break;
            case 'advisor':
                response = answers.advisor;
                isEscalate = true;
                break;
            default:
                response = answers.welcome;
        }

        showTyping();
        setTimeout(() => {
            removeTyping();
            appendMessage(response, 'bot', isEscalate);
            trackEvent('chatbot_chip_click', chipId);
        }, 400);
    }

    // Initial messages
    function loadInitialMessages() {
        const body = document.getElementById('chatbotBody');
        if (!body || body.children.length > 0) return;

        showTyping();
        setTimeout(() => {
            removeTyping();
            appendMessage(currentTexts.welcome, 'bot', false);
        }, 300);
    }

    // Google Analytics Tracker Helper
    function trackEvent(action, label = '') {
        if (typeof gtag === 'function') {
            gtag('event', action, {
                'event_category': 'Chatbot',
                'event_label': label
            });
        }
    }

    // Bind event listeners
    function bindEvents() {
        const windowEl = document.getElementById('chatbotWindow');
        const launcherBtn = document.getElementById('chatbotLauncherBtn');
        const launcherTooltip = document.getElementById('chatbotLauncherTooltip');
        const closeBtn = document.getElementById('chatbotCloseBtn');
        const form = document.getElementById('chatbotForm');
        const input = document.getElementById('chatbotInput');
        const chipsContainer = document.getElementById('chatbotQuickChips');

        function toggleChat() {
            const isActive = windowEl.classList.toggle('active');
            if (launcherBtn) launcherBtn.classList.toggle('is-active', isActive);
            if (isActive) {
                if (launcherTooltip) launcherTooltip.style.display = 'none';
                input.focus();
                trackEvent('chatbot_opened', 'User Opened Chat');
            } else {
                if (launcherTooltip) launcherTooltip.style.display = '';
            }
        }

        if (launcherBtn) launcherBtn.addEventListener('click', toggleChat);
        if (launcherTooltip) launcherTooltip.addEventListener('click', toggleChat);
        if (closeBtn) closeBtn.addEventListener('click', toggleChat);

        // Form submit
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const text = input.value.trim();
                if (text) {
                    input.value = '';
                    handleUserInput(text);
                }
            });
        }

        // Quick chip clicks
        if (chipsContainer) {
            chipsContainer.addEventListener('click', (e) => {
                const btn = e.target.closest('.chatbot-chip');
                if (btn) {
                    const chipId = btn.getAttribute('data-chip-id');
                    handleChipClick(chipId);
                }
            });
        }

        // Quick WhatsApp header track
        const waHeader = document.getElementById('chatbotHeaderWaBtn');
        if (waHeader) {
            waHeader.addEventListener('click', () => trackEvent('chatbot_header_whatsapp', 'Header WA Click'));
        }
    }

    // Initialize once DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatbotDOM);
    } else {
        initChatbotDOM();
    }
})();
