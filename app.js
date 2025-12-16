window.app = {
    currentPage: 'dashboard',

    init: function () {
        this.setupNavigation();
        console.log('AI-Tools Initialized');
    },

    setupNavigation: function () {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Remove active class from all
                navItems.forEach(nav => nav.classList.remove('active'));

                // Add active class to clicked
                const target = e.currentTarget;
                target.classList.add('active');

                // Navigate
                const pageId = target.getAttribute('data-tab');
                this.navigateTo(pageId);
            });
        });
    },

    navigateTo: function (pageId) {
        this.currentPage = pageId;
        this.updateHeader(pageId);
        this.loadContent(pageId);

        // Update sidebar active state in case navigation was triggered from dashboard cards
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.toggle('active', nav.getAttribute('data-tab') === pageId);
        });
    },

    updateHeader: function (pageId) {
        const titleMap = {
            'dashboard': { title: 'Dashboard', sub: 'Welcome back! Ready to create something amazing?' },
            'ideas': { title: 'Idea Generator', sub: 'Spark your next viral video concept.' },
            'scripts': { title: 'Script Writer', sub: 'Turn ideas into production-ready scripts.' },
            'social': { title: 'Social Media Kit', sub: 'Captions, hashtags, and more.' },
            'tts': { title: 'Text to Speech', sub: 'Convert your text into natural sounding audio (Web Speech API).' },
            'remove-bg': { title: 'Background Remover', sub: 'Upload an image to remove its background instantly.' },
            'polish': { title: 'Magic Polish', sub: 'Transform rough drafts into polished mastery.' },
            'repurpose': { title: 'Content Repurposer', sub: 'Turn one piece of content into a multi-platform distribution kit.' },
            'settings': { title: 'Settings', sub: 'Manage your preferences and API keys.' }
        };

        const header = document.getElementById('page-header');
        const subtitle = document.getElementById('page-subtitle');

        if (titleMap[pageId]) {
            header.textContent = titleMap[pageId].title;
            subtitle.textContent = titleMap[pageId].sub;
        }
    },

    loadContent: function (pageId) {
        const contentArea = document.getElementById('content-area');

        // Simple routing simulation
        if (pageId === 'dashboard') {
            this.renderDashboard(contentArea);
        } else if (['ideas', 'scripts', 'social'].includes(pageId)) {
            this.renderToolInterface(contentArea, pageId);
        } else if (pageId === 'tts') {
            this.renderTTSInterface(contentArea);
        } else if (pageId === 'remove-bg') {
            this.renderRemoveBgInterface(contentArea);
        } else if (pageId === 'polish') {
            this.renderPolishInterface(contentArea);
        } else if (pageId === 'repurpose') {
            this.renderRepurposeInterface(contentArea);
        } else if (pageId === 'face-beauty') {
            this.renderFaceBeautyInterface(contentArea);
        } else if (pageId === 'settings') {
            this.renderSettingsInterface(contentArea);
        }
    },

    renderDashboard: function (container) {
        // Re-inject initial dashboard HTML (simplified for now)
        container.innerHTML = `
            <div class="dashboard-grid">
                <div class="card tool-card" onclick="app.navigateTo('ideas')">
                    <div class="card-icon gradient-1"><i class="fa-solid fa-lightbulb"></i></div>
                    <h3>Idea Generator</h3>
                    <p>Generate viral content ideas.</p>
                </div>
                <div class="card tool-card" onclick="app.navigateTo('scripts')">
                    <div class="card-icon gradient-2"><i class="fa-solid fa-scroll"></i></div>
                    <h3>Script Writer</h3>
                    <p>Create engaging scripts.</p>
                </div>
                <div class="card tool-card" onclick="app.navigateTo('social')">
                    <div class="card-icon gradient-3"><i class="fa-solid fa-hashtag"></i></div>
                    <h3>Social Media Kit</h3>
                    <p>Captions & hashtags.</p>
                </div>
                <div class="card tool-card" onclick="app.navigateTo('tts')">
                    <div class="card-icon gradient-1"><i class="fa-solid fa-volume-high"></i></div>
                    <h3>Text to Speech</h3>
                    <p>Natural voices.</p>
                </div>
                <div class="card tool-card" onclick="app.navigateTo('remove-bg')">
                    <div class="card-icon gradient-2"><i class="fa-solid fa-eraser"></i></div>
                    <h3>Remove BG</h3>
                    <p>Instant removal.</p>
                </div>
                <div class="card tool-card" onclick="app.navigateTo('polish')">
                    <div class="card-icon gradient-3"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                    <h3>Magic Polish</h3>
                    <p>Beautify text.</p>
                </div>
                <div class="card tool-card" onclick="app.navigateTo('face-beauty')">
                    <div class="card-icon gradient-4"><i class="fa-solid fa-face-smile"></i></div>
                    <h3>Face Beautifier</h3>
                    <p>Enhance portraits.</p>
                </div>
            </div>
        `;
    },

    renderPolishInterface: function (container) {
        container.innerHTML = `
             <div class="tool-container">
                <div class="form-group">
                    <label class="form-label">Your Draft</label>
                    <textarea class="form-textarea" placeholder="Paste your rough text here..."></textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Desired Style</label>
                    <div class="style-options" style="display: flex; gap: 1rem; flex-wrap: wrap;">
                         <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; padding: 0.5rem 1rem; background: var(--bg-hover); border-radius: 8px;">
                            <input type="radio" name="polish-style" value="Professional" checked> Professional
                        </label>
                        <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; padding: 0.5rem 1rem; background: var(--bg-hover); border-radius: 8px;">
                            <input type="radio" name="polish-style" value="Casual"> Casual
                        </label>
                         <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; padding: 0.5rem 1rem; background: var(--bg-hover); border-radius: 8px;">
                            <input type="radio" name="polish-style" value="Persuasive"> Persuasive
                        </label>
                         <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; padding: 0.5rem 1rem; background: var(--bg-hover); border-radius: 8px;">
                            <input type="radio" name="polish-style" value="Grammar Fix"> Fix Grammar
                        </label>
                    </div>
                </div>
                <button class="action-btn" style="width: 100%; justify-content: center;" onclick="app.generateAI('polish')">
                    <i class="fa-solid fa-sparkles"></i> Polish Text
                </button>
                
                <div class="result-area" style="display: none;">
                    <h3>Polished Result</h3>
                    <div class="result-box"></div>
                </div>
            </div>
        `;
    },

    renderRepurposeInterface: function (container) {
        container.innerHTML = `
            <div class="tool-container">
                <div class="form-group">
                    <label class="form-label">Source Content</label>
                    <textarea class="form-textarea" style="height: 150px;" placeholder="Paste your Video Script, Blog Post, or Rough Notes here..."></textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Target Platforms (Select all that apply)</label>
                    <div class="style-options" style="display: flex; gap: 1rem; flex-wrap: wrap;">
                         <label class="checkbox-btn" style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; padding: 0.5rem 1rem; background: var(--bg-hover); border-radius: 8px;">
                            <input type="checkbox" value="Twitter Thread" checked> Twitter Thread
                        </label>
                        <label class="checkbox-btn" style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; padding: 0.5rem 1rem; background: var(--bg-hover); border-radius: 8px;">
                            <input type="checkbox" value="LinkedIn Post" checked> LinkedIn
                        </label>
                         <label class="checkbox-btn" style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; padding: 0.5rem 1rem; background: var(--bg-hover); border-radius: 8px;">
                            <input type="checkbox" value="Instagram Caption" checked> Instagram
                        </label>
                         <label class="checkbox-btn" style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; padding: 0.5rem 1rem; background: var(--bg-hover); border-radius: 8px;">
                            <input type="checkbox" value="TikTok Script"> TikTok Script
                        </label>
                    </div>
                </div>

                <div class="form-group">
                     <label class="form-label">Vibe / Tone</label>
                     <select class="form-select">
                        <option>Professional & Authoritative</option>
                        <option>Casual & Relatable</option>
                        <option>Viral & Hype</option>
                        <option>Educational</option>
                     </select>
                </div>

                <button class="action-btn" style="width: 100%; justify-content: center;" onclick="app.generateAI('repurpose')">
                    <i class="fa-solid fa-recycle"></i> Repurpose Content
                </button>
                
                <div class="result-area" style="display: none;">
                    <h3>Distribution Kit</h3>
                    <div class="result-box"></div>
                </div>
            </div>
        `;
    },

    renderTTSInterface: function (container) {
        container.innerHTML = `
            <div class="tool-container">
                <div class="form-group">
                    <label class="form-label">TTS Provider</label>
                    <select id="tts-provider" class="form-select" onchange="app.toggleTTSOptions()">
                        <option value="browser">Free (Browser Standard)</option>
                        <option value="google">Premium (Google Cloud Neural)</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Enter Text</label>
                    <textarea class="form-textarea" placeholder="Type what you want the AI to say..."></textarea>
                </div>
                
                <div class="form-group" id="browser-voice-group">
                    <label class="form-label">Browser Voice</label>
                    <select class="form-select" id="browser-voice-select">
                        <option>Default</option>
                        <option>Female (if available)</option>
                    </select>
                </div>

                <div class="form-group" id="openai-voice-group" style="display: none;">
                    <label class="form-label">OpenAI Voice</label>
                    <select class="form-select" id="openai-voice-select">
                        <option value="alloy">Alloy (Balanced)</option>
                        <option value="echo">Echo (Male)</option>
                        <option value="fable">Fable (British-ish)</option>
                        <option value="onyx">Onyx (Deep Male)</option>
                        <option value="nova">Nova (Energetic Female)</option>
                        <option value="shimmer">Shimmer (Clear Female)</option>
                    </select>
                    <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.5rem;">Requires OpenAI API Key.</p>
                </div>

                <div class="form-group" id="google-voice-group" style="display: none;">
                    <label class="form-label">Neural Voice</label>
                    <select class="form-select" id="google-voice-select">
                        <option value="en-US-Neural2-J">English (US) - Neural Male</option>
                        <option value="en-US-Neural2-F">English (US) - Neural Female</option>
                        <option value="id-ID-Wavenet-B">Indonesian - WaveNet Male</option>
                        <option value="id-ID-Wavenet-A">Indonesian - WaveNet Female</option>
                    </select>
                    <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.5rem;">Requires Google Cloud API Key with "Text-to-Speech API" enabled.</p>
                </div>

                <button class="action-btn" style="width: 100%; justify-content: center;" onclick="app.speakText()">
                    <i class="fa-solid fa-volume-high"></i> Generate Audio
                </button>

                <div id="tts-result" class="result-area" style="display: none; text-align: center;">
                    <h3>Audio Result</h3>
                    <audio id="audio-player" controls style="width: 100%; margin: 1rem 0;"></audio>
                    <a id="download-link" class="action-btn" style="display: inline-flex;">Download MP3</a>
                </div>
            </div>
        `;
    },

    toggleTTSOptions: function () {
        const provider = document.getElementById('tts-provider').value;
        const browserGroup = document.getElementById('browser-voice-group');
        const googleGroup = document.getElementById('google-voice-group');

        browserGroup.style.display = 'none';
        googleGroup.style.display = 'none';

        if (provider === 'browser') {
            browserGroup.style.display = 'block';
        } else if (provider === 'google') {
            googleGroup.style.display = 'block';
        }
    },

    renderRemoveBgInterface: function (container) {
        container.innerHTML = `
            <div class="tool-container">
                <div class="form-group">
                    <label class="form-label">Upload Image</label>
                    <div style="border: 2px dashed var(--border-color); padding: 2rem; border-radius: 12px; text-align: center; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.borderColor='var(--text-accent)'" onmouseout="this.style.borderColor='var(--border-color)'" onclick="document.querySelector('input[type=file]').click()">
                        <i class="fa-solid fa-cloud-arrow-up" style="font-size: 2rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                        <p style="color: var(--text-secondary);">Click or drag image here</p>
                        <input type="file" style="display: none;" accept="image/*" onchange="this.previousElementSibling.innerText = this.files[0].name">
                    </div>
                </div>
                <button class="action-btn" style="width: 100%; justify-content: center;" onclick="app.removeBackground()">
                    <i class="fa-solid fa-eraser"></i> Remove Background
                </button>
            </div>
        `;
    },

    renderFaceBeautyInterface: function (container) {
        container.innerHTML = `
            <div class="tool-container">
                <div class="upload-area" id="upload-area">
                    <i class="fa-solid fa-cloud-arrow-up" style="font-size: 3rem; margin-bottom: 1rem; color: var(--primary);"></i>
                    <h3>Upload Photo to Enhance</h3>
                    <p style="color: var(--text-secondary);">Supports JPG, PNG (Max 10MB)</p>
                    <input type="file" id="image-upload" accept="image/*" style="display: none;" onchange="app.handleImageSelect(this)">
                    <button class="action-btn" onclick="document.getElementById('image-upload').click()" style="margin-top: 1rem;">Choose File</button>
                    <div id="file-name" style="margin-top: 1rem; color: var(--text-accent);"></div>
                </div>

                <button class="action-btn" style="width: 100%; justify-content: center; margin-top: 2rem;" onclick="app.enhanceFace()">
                    <i class="fa-solid fa-wand-magic-sparkles"></i> Enhance Face
                </button>

                <div id="result-area" class="result-area" style="display: none; text-align: center;">
                    <h3>Enhanced Result</h3>
                    <div class="image-comparison" style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <div>
                            <p>Original</p>
                            <img id="original-image" style="max-width: 100%; height: auto; border-radius: 10px;">
                        </div>
                        <div>
                            <p>Enhanced</p>
                            <img id="processed-image" style="max-width: 100%; height: auto; border-radius: 10px;">
                        </div>
                    </div>
                    <a id="download-btn" class="action-btn" style="display: inline-flex; margin-top: 1rem;">Download HD Image</a>
                </div>
            </div>
        `;
    },

    renderSettingsInterface: function (container) {
        const geminiKey = localStorage.getItem('gemini_api_key') || '';
        const geminiModel = localStorage.getItem('gemini_config_model') || 'gemini-1.5-pro';
        const removeBgKey = localStorage.getItem('removebg_api_key') || '';
        const googleTtsKey = localStorage.getItem('google_tts_key') || '';

        container.innerHTML = `
            <div class="tool-container">
                <h3>Settings & API Keys</h3>
                <p style="color: var(--text-secondary); margin-bottom: 2rem;">Configure your AI providers.</p>
                
                 <div class="form-group">
                    <label class="form-label">AI Provider (Text Gen)</label>
                    <select id="ai-provider" class="form-select" onchange="app.toggleProviderSettings()">
                        <option value="gemini" ${localStorage.getItem('active_provider') === 'gemini' ? 'selected' : ''}>Google Gemini</option>
                        <option value="zai" ${localStorage.getItem('active_provider') === 'zai' ? 'selected' : ''}>Z.AI (GLM-4)</option>
                    </select>
                </div>

                <!-- Gemini Text Settings -->
                <div id="gemini-settings" style="display: ${localStorage.getItem('active_provider') !== 'zai' ? 'block' : 'none'};">
                    <div class="form-group">
                        <label class="form-label">Google Gemini API Key</label>
                        <input type="password" id="gemini-key" class="form-input" placeholder="AIzq..." value="${geminiKey}">
                    </div>
                     <div class="form-group">
                        <label class="form-label">Gemini Model Version</label>
                        <input type="text" id="gemini-model" class="form-input" placeholder="gemini-1.5-pro" value="${geminiModel}">
                    </div>
                </div>

                <!-- ZAI Settings -->
                <div id="zai-settings" style="display: ${localStorage.getItem('active_provider') === 'zai' ? 'block' : 'none'};">
                     <div class="form-group">
                        <label class="form-label">Z.AI API Key</label>
                        <input type="password" id="zai-key" class="form-input" value="${localStorage.getItem('zai_api_key') || ''}">
                    </div>
                     <div class="form-group">
                        <label class="form-label">Z.AI Model</label>
                        <input type="text" id="zai-model" class="form-input" placeholder="glm-4" value="${localStorage.getItem('zai_model') || 'glm-4'}">
                    </div>
                </div>

                <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 2rem 0;">
                <h4>Tool Specific Keys</h4>

                <div class="form-group">
                    <label class="form-label">Google Cloud TTS Key (Premium Voice)</label>
                    <input type="password" id="google-tts-key" class="form-input" placeholder="AIzq... (Can be same as Gemini Key)" value="${googleTtsKey}">
                    <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.5rem;">Requires 'Cloud Text-to-Speech API' enabled in Google Console.</p>
                </div>

                <div class="form-group">
                    <label class="form-label">Remove.bg API Key (Optional)</label>
                    <input type="password" id="removebg-key" class="form-input" placeholder="Get from remove.bg" value="${localStorage.getItem('removebg_api_key') || ''}">
                    <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.5rem;">Only needed for the Background Remover tool.</p>
                </div>

                <div class="form-group">
                    <label class="form-label">Cutout.pro API Key (Optional)</label>
                    <input type="password" id="cutout-key" class="form-input" placeholder="Legacy / Not used in Free Mode" value="${localStorage.getItem('cutout_api_key') || ''}" disabled>
                    <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.5rem;">We now use a Free Client-Side "Magic Smooth" instead!</p>
                </div>

                <button class="action-btn" style="width: 100%; justify-content: center;" onclick="app.saveSettings()">
                    <i class="fa-solid fa-floppy-disk"></i> Save Settings
                </button>
            </div>
        `;
    },

    toggleProviderSettings: function () {
        const provider = document.getElementById('ai-provider').value;
        document.getElementById('gemini-settings').style.display = provider === 'gemini' ? 'block' : 'none';
        document.getElementById('zai-settings').style.display = provider === 'zai' ? 'block' : 'none';

        // Hide others if exists
        const openaiSet = document.getElementById('openai-settings');
        if (openaiSet) openaiSet.style.display = 'none';
    },

    saveSettings: function () {
        const provider = document.getElementById('ai-provider').value;
        const geminiKey = document.getElementById('gemini-key').value;
        const geminiModel = document.getElementById('gemini-model').value;
        const zaiKey = document.getElementById('zai-key').value;
        // Optional safe-guard if fields are missing in new render
        const zaiModel = document.getElementById('zai-model') ? document.getElementById('zai-model').value : 'glm-4';

        const googleTtsKey = document.getElementById('google-tts-key').value;
        const removeBgKey = document.getElementById('removebg-key').value;
        const cutoutKey = document.getElementById('cutout-key').value;

        localStorage.setItem('active_provider', provider);
        localStorage.setItem('gemini_api_key', geminiKey);
        localStorage.setItem('gemini_config_model', geminiModel);

        localStorage.setItem('zai_api_key', zaiKey);
        localStorage.setItem('zai_model', zaiModel);

        localStorage.setItem('google_tts_key', googleTtsKey);
        localStorage.setItem('removebg_api_key', removeBgKey);
        localStorage.setItem('cutout_api_key', cutoutKey);

        // Visual feedback
        const btn = document.querySelector('.action-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Saved!';
        btn.style.backgroundColor = 'var(--accent-1)';
        btn.style.color = 'var(--bg-dark)';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.backgroundColor = '';
            btn.style.color = '';
        }, 2000);
    },

    // --- API & Logic Functions ---

    generateAI: async function (type) {
        const provider = localStorage.getItem('active_provider') || 'gemini';
        let apiKey = '';

        if (provider === 'gemini') {
            apiKey = localStorage.getItem('gemini_api_key');
            if (!apiKey) { alert('Gemini API Key missing!'); this.navigateTo('settings'); return; }
        } else if (provider === 'openai') {
            apiKey = localStorage.getItem('openai_api_key');
            if (!apiKey) { alert('OpenAI API Key missing!'); this.navigateTo('settings'); return; }
        } else if (provider === 'zai') {
            apiKey = localStorage.getItem('zai_api_key');
            if (!apiKey) { alert('Z.AI API Key missing!'); this.navigateTo('settings'); return; }
        }

        const btn = document.querySelector('.action-btn');
        const resultArea = document.querySelector('.result-area');
        const resultBox = document.querySelector('.result-box');
        const originalBtnText = btn.innerHTML;

        // UI Loading State
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';
        resultArea.style.display = 'none';

        let prompt = '';
        const inputVal = document.querySelector('.form-textarea').value;
        const tone = document.querySelector('.form-select') ? document.querySelector('.form-select').value : '';

        if (!inputVal) {
            alert('Please enter some text!');
            btn.disabled = false;
            btn.innerHTML = originalBtnText;
            return;
        }

        // Prompt Engineering
        if (type === 'ideas') {
            prompt = `Generate 5 viral content ideas for the topic "${inputVal}" with a ${tone} tone. Format as a numbered list with brief descriptions.`;
        } else if (type === 'scripts') {
            prompt = `Write a video script for the topic: "${inputVal}". Tone: ${tone}. Include a Hook, Intro, Main Body (3 points), and Call to Action.`;
        } else if (type === 'social') {
            prompt = `Create a social media kit for: "${inputVal}". Include: 
            1. Instagram Caption (${tone})
            2. 10 Trending Hashtags
            3. TikTok Description`;
        } else if (type === 'polish') {
            const style = document.querySelector('input[name="polish-style"]:checked').value;
            prompt = `Rewrite the following text to make it more ${style}: 
            "${inputVal}"
            
            Return only the polished text.`;
        } else if (type === 'repurpose') {
            const tone = document.querySelector('.form-select').value;
            const platforms = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value).join(', ');

            if (!platforms) { alert('Please select at least one platform!'); btn.disabled = false; btn.innerHTML = originalBtnText; return; }

            prompt = `You are an expert Social Media Manager. Repurpose the following SOURCE CONTENT into different formats for: ${platforms}.
            
            Tone: ${tone}.
            
            SOURCE CONTENT:
            "${inputVal}"
            
            ---
            Output Requirements:
            - Clearly separate each platform with a header (e.g., "### 🐦 Twitter Thread").
            - For Twitter: Create a hooky thread.
            - For LinkedIn: Professional, spacing for readability.
            - For Instagram: Visual description suggestion + Caption + Hashtags.
            - Use appropriate emojis.
            `;
        }

        try {
            let response = '';
            if (provider === 'gemini') {
                response = await this.callGemini(apiKey, prompt);
            } else if (provider === 'openai') {
                response = await this.callOpenAI(apiKey, prompt);
            } else if (provider === 'zai') {
                response = await this.callZAI(apiKey, prompt);
            }

            resultBox.innerHTML = this.formatMarkdown(response); // Simple formatting
            resultArea.style.display = 'block';
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            btn.disabled = false;
            btn.innerHTML = originalBtnText;
        }
    },

    callGemini: async function (apiKey, prompt) {
        // Use configured model or fallback
        const model = localStorage.getItem('gemini_config_model') || 'gemini-1.5-pro';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error.message || 'Failed to fetch from Gemini');
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    },

    callOpenAI: async function (apiKey, prompt) {
        const model = localStorage.getItem('openai_model') || 'gpt-4o';

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        { role: 'user', content: prompt }
                    ]
                })
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error?.message || 'OpenAI API Error');
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (e) {
            throw new Error("Failed to connect to OpenAI: " + e.message);
        }
    },

    callZAI: async function (apiKey, prompt) {
        // Z.AI (GLM) often uses OpenAI-compatible endpoint structure
        // Endpoint: https://open.bigmodel.cn/api/paas/v4/chat/completions
        const model = localStorage.getItem('zai_model') || 'glm-4';

        try {
            const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        { role: 'user', content: prompt }
                    ]
                })
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error?.message || 'Z.AI API Error');
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (e) {
            throw new Error("Failed to connect to Z.AI. Check your API Key.");
        }
    },

    // --- Text to Speech ---
    speakText: async function () {
        const provider = document.getElementById('tts-provider').value;
        const text = document.querySelector('.form-textarea').value;

        if (!text) return alert('Please enter text into the box!');

        if (provider === 'browser') {
            const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(text);
            synth.speak(utterance);
        } else if (provider === 'google') {
            // Google Cloud TTS
            const apiKey = localStorage.getItem('google_tts_key');
            if (!apiKey) return alert('Please save Google Cloud TTS Key in Settings!');

            const voiceSelect = document.getElementById('google-voice-select');
            const voiceValue = voiceSelect.value;
            // Parse voice value: "en-US-Neural2-J" -> lang: en-US, name: en-US-Neural2-J
            const langCode = voiceValue.split('-').slice(0, 2).join('-');

            const btn = document.querySelector('.action-btn');
            const originalText = btn.innerHTML;

            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Synthesizing...';

            try {
                const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;

                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        input: { text: text },
                        voice: { languageCode: langCode, name: voiceValue },
                        audioConfig: { audioEncoding: "MP3" }
                    })
                });

                if (!response.ok) {
                    const err = await response.json();
                    throw new Error(err.error?.message || 'Google TTS Error');
                }

                const data = await response.json();

                if (!data.audioContent) throw new Error("No audio content received.");

                const blob = await fetch(`data:audio/mp3;base64,${data.audioContent}`).then(r => r.blob());
                const audioUrl = URL.createObjectURL(blob);

                const resultArea = document.getElementById('tts-result');
                const audioPlayer = document.getElementById('audio-player');
                const downloadLink = document.getElementById('download-link');

                audioPlayer.src = audioUrl;
                audioPlayer.play();

                downloadLink.href = audioUrl;
                downloadLink.download = `google-neural-audio-${Date.now()}.mp3`;

                resultArea.style.display = 'block';

            } catch (error) {
                alert('Google Cloud TTS Error: ' + error.message);
            } finally {
                btn.disabled = false;
                btn.innerHTML = originalText;
            }
        }
    },

    // --- Remove Background ---
    removeBackground: async function () {
        const apiKey = localStorage.getItem('removebg_api_key');
        if (!apiKey) return alert('Please enter Remove.bg API Key in Settings!');

        const fileInput = document.querySelector('input[type="file"]');
        if (!fileInput.files[0]) return alert('Please upload an image!');

        const btn = document.querySelector('.action-btn');
        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

        const formData = new FormData();
        formData.append('image_file', fileInput.files[0]);
        formData.append('size', 'auto');

        try {
            const response = await fetch('https://api.remove.bg/v1.0/removebg', {
                method: 'POST',
                headers: { 'X-Api-Key': apiKey },
                body: formData
            });

            if (!response.ok) throw new Error('API Error');

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            // Show result
            // Replace container content with result
            const container = document.querySelector('.tool-container');
            container.innerHTML += `
                <div class="result-area" style="display:block; text-align:center;">
                    <h3>Result</h3>
                    <img src="${url}" style="max-width:100%; border-radius:10px; margin-top:1rem;">
                    <a href="${url}" download="no-bg.png" class="action-btn" style="margin-top:1rem; display:inline-flex; justify-content:center;">
                        <i class="fa-solid fa-download"></i> Download
                    </a>
                </div>
            `;

        } catch (error) {
            alert('Failed to remove background. Check API Key or Quota.');
        } finally {
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    },

    // --- Face Beautifier (Client-Side glfx.js) ---
    enhanceFace: function () {
        const fileInput = document.getElementById('image-upload');
        const file = fileInput.files[0];

        if (!file) return alert('Please upload an image first!');

        // No API Key check needed for client-side!

        const btn = document.querySelector('.action-btn');
        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Magic Smoothing...';

        const originalImg = document.getElementById('original-image');
        const processedImg = document.getElementById('processed-image');
        const resultArea = document.getElementById('result-area');
        const downloadBtn = document.getElementById('download-btn');

        // Create an image object to load the file
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = function () {
            try {
                // Initialize glfx canvas
                // glfx-es6 exports as 'fx' usually, or check global window.fx
                if (typeof fx === 'undefined') {
                    throw new Error('glfx.js library not loaded. Check internet connection.');
                }

                const canvas = fx.canvas();
                const texture = canvas.texture(img);

                // Apply Filters: 
                // 1. Denoise (Smart Blur) - Exponent 20 is a good "beauty" spot
                // 2. Unsharp Mask (Optional) - to keep eyes/edges crisp after smooth? 
                //    For now, just Denoise is safe for "Skin Smooth"

                canvas.draw(texture)
                    .denoise(25) // High denoise acts like skin smoothing
                    .brightnessContrast(0.05, 0.05) // Slight pop
                    .update();

                // Convert to Image
                const resultUrl = canvas.toDataURL('image/png');

                // Show Result
                originalImg.src = img.src;
                processedImg.src = resultUrl;

                downloadBtn.href = resultUrl;
                downloadBtn.download = `magic-smooth-${Date.now()}.png`;

                resultArea.style.display = 'block';

            } catch (err) {
                alert('Error: ' + err.message);
                console.error(err);
            } finally {
                btn.disabled = false;
                btn.innerHTML = originalText;
            }
        };

        img.onerror = function () {
            alert('Failed to load image.');
            btn.disabled = false;
            btn.innerHTML = originalText;
        };
    },

    handleImageSelect: function (input) {
        if (input.files && input.files[0]) {
            document.getElementById('file-name').innerText = input.files[0].name;
        }
    },

    // Utilities
    formatMarkdown: function (text) {
        // Very basic markdown parsing
        return text
            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
            .replace(/\n/g, '<br>');
    },

    renderToolInterface: function (container, toolType) {
        const toolConfig = {
            'ideas': {
                label: 'Topic or Niche',
                placeholder: 'E.g., Tech Reviews, Daily Vlog, Cooking...',
                btnText: 'Generate Ideas'
            },
            'scripts': {
                label: 'Video Topic',
                placeholder: 'What is this video about?',
                btnText: 'Write Script'
            },
            'social': {
                label: 'Content Description',
                placeholder: 'Describe your image or video...',
                btnText: 'Generate Caption'
            }
        };

        const config = toolConfig[toolType];

        container.innerHTML = `
            <div class="tool-container">
                <div class="form-group">
                    <label class="form-label">${config.label}</label>
                    <textarea class="form-textarea" placeholder="${config.placeholder}"></textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Tone</label>
                    <select class="form-select">
                        <option>Professional</option>
                        <option>Funny</option>
                        <option>Casual</option>
                        <option>Excited</option>
                    </select>
                </div>
                <button class="action-btn" style="width: 100%; justify-content: center;" onclick="app.generateAI('${toolType}')">
                    <i class="fa-solid fa-wand-magic-sparkles"></i> ${config.btnText}
                </button>

                <div class="result-area" style="display: none;">
                    <h3>Result</h3>
                    <div class="result-box"></div>
                </div>
            </div>
        `;
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
