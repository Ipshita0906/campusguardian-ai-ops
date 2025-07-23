// CampusGuardian AI Security Operations Center
class SecurityOperationsCenter {
    constructor() {
        this.currentUser = null;
        this.currentSection = 'dashboard';
        this.isLoggedIn = false;
        this.updateIntervals = [];
        this.cameraFeeds = [];
        this.incidents = [];
        this.alerts = [];
        
        // Initialize with provided data
        this.campusData = {
            buildings: [
                {id: 1, name: "Main Library", cameras: 8, occupancy: 245},
                {id: 2, name: "Student Union", cameras: 6, occupancy: 412}, 
                {id: 3, name: "Engineering Hall", cameras: 5, occupancy: 178},
                {id: 4, name: "Science Center", cameras: 7, occupancy: 203},
                {id: 5, name: "Residence Hall A", cameras: 4, occupancy: 156},
                {id: 6, name: "Residence Hall B", cameras: 4, occupancy: 189},
                {id: 7, name: "Athletics Center", cameras: 6, occupancy: 89},
                {id: 8, name: "Dining Commons", cameras: 5, occupancy: 298},
                {id: 9, name: "Business School", cameras: 4, occupancy: 134},
                {id: 10, name: "Medical Center", cameras: 7, occupancy: 67}
            ],
            cameras: [
                {id: "CAM_001", name: "Main Library - Entrance", building: "Main Library", status: "active", detections: ["person", "person", "vehicle"]},
                {id: "CAM_002", name: "Student Union - Lobby", building: "Student Union", status: "active", detections: ["person", "person", "person", "bag"]},
                {id: "CAM_003", name: "Engineering Hall - Lab Wing", building: "Engineering Hall", status: "active", detections: ["person"]},
                {id: "CAM_004", name: "Science Center - Atrium", building: "Science Center", status: "active", detections: ["person", "person"]},
                {id: "CAM_005", name: "Residence Hall A - Common Area", building: "Residence Hall A", status: "active", detections: ["person", "bicycle"]},
                {id: "CAM_006", name: "Athletics Center - Main Gym", building: "Athletics Center", status: "active", detections: ["person", "person", "person"]},
                {id: "CAM_007", name: "Dining Commons - Seating Area", building: "Dining Commons", status: "active", detections: ["person", "person", "person", "person"]},
                {id: "CAM_008", name: "Business School - Lecture Hall", building: "Business School", status: "active", detections: ["person", "laptop"]},
                {id: "CAM_009", name: "Medical Center - Reception", building: "Medical Center", status: "active", detections: ["person", "person"]},
                {id: "CAM_010", name: "Campus Quad - Central", building: "Outdoor", status: "active", detections: ["person", "bicycle", "dog"]},
                {id: "CAM_011", name: "Parking Lot - North", building: "Outdoor", status: "active", detections: ["vehicle", "vehicle", "person"]},
                {id: "CAM_012", name: "Emergency Exit - South Wing", building: "Main Library", status: "maintenance", detections: []}
            ],
            metrics: {
                peopleDetectedToday: 1247,
                activeCameras: 56,
                totalCameras: 56,
                incidentsPrevented: 12,
                averageResponseTime: 2.3,
                detectionAccuracy: 94.7,
                falseAlarmRate: 3.2,
                systemUptime: 99.9,
                currentOccupancy: 2156
            }
        };
        
        this.initializeSimulatedData();
        this.init();
    }

    init() {
        // Initialize immediately if DOM is ready, otherwise wait
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupApplication());
        } else {
            setTimeout(() => this.setupApplication(), 100);
        }
    }

    setupApplication() {
        this.setupEventListeners();
        this.setupTimeUpdates();
        this.showLoginScreen();
        console.log('🛡️ CampusGuardian AI SOC Ready');
    }

    initializeSimulatedData() {
        this.incidents = [
            {
                id: 'INC-2024-0158',
                type: 'Unauthorized Access',
                location: 'Perimeter Gate B',
                priority: 'critical',
                status: 'Active',
                assigned: 'Officer Martinez',
                time: '14:30',
                description: 'Unauthorized access attempt detected at perimeter gate'
            },
            {
                id: 'INC-2024-0157',
                type: 'Suspicious Activity',
                location: 'Student Union Plaza',
                priority: 'high',
                status: 'Investigating',
                assigned: 'Officer Chen',
                time: '14:15',
                description: 'Individual exhibiting suspicious behavior near restricted area'
            },
            {
                id: 'INC-2024-0156',
                type: 'Equipment Malfunction',
                location: 'Library Back Entrance',
                priority: 'medium',
                status: 'Resolved',
                assigned: 'Officer Johnson',
                time: '13:45',
                description: 'Camera CAM-012 went offline, maintenance completed'
            }
        ];

        this.alerts = [
            {
                type: 'Unusual Crowd Density',
                location: 'Student Union Plaza',
                priority: 'high',
                time: '2 minutes ago',
                icon: '⚠️'
            },
            {
                type: 'Motion After Hours',
                location: 'Library Back Entrance',
                priority: 'medium',
                time: '8 minutes ago',
                icon: '👁️'
            }
        ];

        this.initializeCameraFeeds();
    }

    initializeCameraFeeds() {
        this.cameraFeeds = [];
        for (let i = 1; i <= 12; i++) {
            const camera = this.campusData.cameras[i - 1];
            this.cameraFeeds.push({
                id: camera ? camera.id : `CAM_${String(i).padStart(3, '0')}`,
                name: camera ? camera.name : `Camera ${i}`,
                status: camera ? camera.status : (Math.random() > 0.9 ? 'maintenance' : 'active'),
                recording: Math.random() > 0.3,
                peopleCount: Math.floor(Math.random() * 8),
                vehicleCount: Math.floor(Math.random() * 3),
                detections: camera ? camera.detections : []
            });
        }
    }

    setupEventListeners() {
        // Multiple approaches to ensure login works
        this.setupLoginHandlers();
        
        // Other event listeners
        this.setupNavigationHandlers();
        this.setupInteractionHandlers();
        this.setupKeyboardShortcuts();
    }

    setupLoginHandlers() {
        // Direct button click handler
        const loginButton = document.querySelector('button[type="submit"]');
        if (loginButton) {
            loginButton.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.processLogin();
                return false;
            };
        }

        // Form submit handler
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.onsubmit = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.processLogin();
                return false;
            };
        }

        // Input enter key handlers
        ['username', 'password'].forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.onkeydown = (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        this.processLogin();
                    }
                };
            }
        });

        // Global click handler as backup
        document.addEventListener('click', (e) => {
            if (e.target.textContent === 'Access SOC' || e.target.type === 'submit') {
                e.preventDefault();
                e.stopPropagation();
                this.processLogin();
            }
        });
    }

    processLogin() {
        const username = document.getElementById('username')?.value?.trim() || '';
        const password = document.getElementById('password')?.value?.trim() || '';
        const role = document.getElementById('role')?.value || 'admin';
        
        console.log(`Login attempt: ${username}/${password}`);
        
        if (username === 'admin' && password === 'admin') {
            this.currentUser = {
                username: username,
                role: 'Security Administrator'
            };
            
            this.showMainApplication();
            this.showNotification('Welcome to CampusGuardian AI SOC', 'success');
        } else {
            this.showNotification('Invalid credentials. Use admin/admin', 'error');
            const passwordField = document.getElementById('password');
            if (passwordField) {
                passwordField.value = '';
                passwordField.focus();
            }
        }
    }

    setupNavigationHandlers() {
        // Logout
        setTimeout(() => {
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.onclick = () => this.handleLogout();
            }
        }, 100);

        // Navigation items
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-item')) {
                e.preventDefault();
                const navItem = e.target.closest('.nav-item');
                const section = navItem.getAttribute('data-section');
                if (section) {
                    this.navigateToSection(section);
                }
            }
        });
    }

    setupInteractionHandlers() {
        // Quick actions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.quick-action')) {
                this.handleQuickAction(e.target.closest('.quick-action'));
            }
        });

        // Zone markers
        document.addEventListener('click', (e) => {
            if (e.target.closest('.zone-marker')) {
                this.showZoneDetails(e.target.closest('.zone-marker'));
            }
        });

        // Alert actions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.alert-actions')) {
                const button = e.target;
                const alertItem = button.closest('.alert-item');
                if (button.textContent === 'View') {
                    this.viewAlertDetails(alertItem);
                } else if (button.textContent === 'Respond') {
                    this.respondToAlert(alertItem);
                }
            }
        });

        // Incident actions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.actions-cell')) {
                const button = e.target;
                const row = button.closest('tr');
                if (button.textContent === 'View') {
                    this.viewIncidentDetails(row);
                } else if (button.textContent.includes('Update') || button.textContent.includes('Report')) {
                    this.updateIncident(row);
                }
            }
        });

        // Modal controls
        document.addEventListener('click', (e) => {
            if (e.target.id === 'closeIncidentModal' || e.target.classList.contains('modal-close')) {
                this.closeModal();
            }
        });

        // Settings and refresh
        document.addEventListener('click', (e) => {
            if (e.target.id === 'saveSettings') {
                this.saveSettings();
            } else if (e.target.id === 'refreshDashboard') {
                this.refreshDashboard();
            }
        });

        // Range inputs
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('form-range')) {
                this.updateRangeValue(e.target);
            }
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
            
            if (e.ctrlKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        this.navigateToSection('dashboard');
                        break;
                    case '2':
                        e.preventDefault();
                        this.navigateToSection('security');
                        break;
                    case '3':
                        e.preventDefault();
                        this.navigateToSection('incidents');
                        break;
                    case '4':
                        e.preventDefault();
                        this.navigateToSection('analytics');
                        break;
                    case 'r':
                        e.preventDefault();
                        this.refreshDashboard();
                        break;
                }
            }
        });
    }

    setupTimeUpdates() {
        setInterval(() => {
            const now = new Date();
            const timeEl = document.getElementById('currentTime');
            const dateEl = document.getElementById('currentDate');
            
            if (timeEl) {
                timeEl.textContent = now.toLocaleTimeString('en-US', { 
                    hour12: false, 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit' 
                });
            }
            
            if (dateEl) {
                dateEl.textContent = now.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
            }
        }, 1000);

        this.updateIntervals.push(setInterval(() => {
            if (this.isLoggedIn) {
                this.updateLiveMetrics();
            }
        }, 5000));

        this.updateIntervals.push(setInterval(() => {
            if (this.isLoggedIn) {
                this.updateAlerts();
            }
        }, 10000));

        this.updateIntervals.push(setInterval(() => {
            if (this.isLoggedIn && this.currentSection === 'security') {
                this.updateCameraDetections();
            }
        }, 3000));
    }

    showLoginScreen() {
        const loginScreen = document.getElementById('loginScreen');
        const mainApp = document.getElementById('mainApp');
        
        if (loginScreen) loginScreen.classList.remove('hidden');
        if (mainApp) mainApp.classList.add('hidden');
        
        this.isLoggedIn = false;
    }

    handleLogout() {
        this.currentUser = null;
        this.isLoggedIn = false;
        
        this.updateIntervals.forEach(interval => clearInterval(interval));
        this.updateIntervals = [];
        
        const loginForm = document.getElementById('loginForm');
        if (loginForm) loginForm.reset();
        
        this.showLoginScreen();
        this.showNotification('Logged out successfully', 'info');
    }

    showMainApplication() {
        const loginScreen = document.getElementById('loginScreen');
        const mainApp = document.getElementById('mainApp');
        
        if (loginScreen) loginScreen.classList.add('hidden');
        if (mainApp) mainApp.classList.remove('hidden');
        
        this.isLoggedIn = true;
        
        // Update user info
        const userNameEl = document.getElementById('userName');
        const userRoleEl = document.getElementById('userRole');
        
        if (userNameEl && this.currentUser) {
            userNameEl.textContent = this.currentUser.username;
        }
        if (userRoleEl && this.currentUser) {
            userRoleEl.textContent = this.currentUser.role;
        }
        
        // Load dashboard
        setTimeout(() => {
            this.loadDashboardData();
            this.updateSystemStatus();
        }, 100);
    }

    navigateToSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        const navItem = document.querySelector(`[data-section="${sectionName}"]`);
        if (navItem) {
            navItem.classList.add('active');
        }
        
        // Update content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        const section = document.getElementById(`${sectionName}-section`);
        if (section) {
            section.classList.add('active');
        }
        
        this.currentSection = sectionName;
        
        // Load section-specific data
        setTimeout(() => {
            switch(sectionName) {
                case 'security':
                    this.loadSecurityCenter();
                    break;
                case 'incidents':
                    this.loadIncidentData();
                    break;
                case 'analytics':
                    this.loadAnalyticsData();
                    break;
                case 'settings':
                    this.loadSettingsData();
                    break;
            }
        }, 50);
    }

    loadDashboardData() {
        this.updateMetricsDisplay();
        this.updateAlertsDisplay();
        this.updateActivityFeed();
    }

    updateSystemStatus() {
        const statusEl = document.getElementById('systemStatus');
        const uptimeEl = document.getElementById('systemUptime');
        
        if (statusEl) {
            statusEl.textContent = 'OPERATIONAL';
            statusEl.className = 'status status--success';
        }
        
        if (uptimeEl) {
            uptimeEl.textContent = `${this.campusData.metrics.systemUptime}%`;
        }
        
        this.updateAlertCounts();
    }

    updateAlertCounts() {
        const criticalCount = this.incidents.filter(inc => inc.priority === 'critical' && inc.status === 'Active').length;
        const highCount = this.incidents.filter(inc => inc.priority === 'high' && inc.status === 'Active').length + 
                         this.alerts.filter(alert => alert.priority === 'high').length;
        const mediumCount = this.incidents.filter(inc => inc.priority === 'medium' && inc.status === 'Active').length + 
                           this.alerts.filter(alert => alert.priority === 'medium').length;
        
        const criticalAlerts = document.getElementById('criticalAlerts');
        const highAlerts = document.getElementById('highAlerts');
        const mediumAlerts = document.getElementById('mediumAlerts');
        
        if (criticalAlerts) criticalAlerts.textContent = criticalCount;
        if (highAlerts) highAlerts.textContent = highCount;
        if (mediumAlerts) mediumAlerts.textContent = mediumCount;
    }

    updateMetricsDisplay() {
        const metrics = this.campusData.metrics;
        
        const elements = {
            peopleDetected: document.getElementById('peopleDetected'),
            activeCameras: document.getElementById('activeCameras'),
            incidentsPrevented: document.getElementById('incidentsPrevented'),
            responseTime: document.getElementById('responseTime')
        };
        
        if (elements.peopleDetected) {
            elements.peopleDetected.textContent = metrics.peopleDetectedToday.toLocaleString();
        }
        if (elements.activeCameras) {
            elements.activeCameras.textContent = `${metrics.activeCameras}/${metrics.totalCameras}`;
        }
        if (elements.incidentsPrevented) {
            elements.incidentsPrevented.textContent = metrics.incidentsPrevented;
        }
        if (elements.responseTime) {
            elements.responseTime.textContent = `${metrics.averageResponseTime} min`;
        }
    }

    updateAlertsDisplay() {
        const alertsList = document.getElementById('alertsList');
        if (!alertsList) return;
        
        alertsList.innerHTML = '';
        
        this.alerts.slice(0, 2).forEach(alert => {
            const alertEl = document.createElement('div');
            alertEl.className = `alert-item ${alert.priority}`;
            alertEl.innerHTML = `
                <div class="alert-icon">${alert.icon}</div>
                <div class="alert-content">
                    <div class="alert-title">${alert.type}</div>
                    <div class="alert-location">${alert.location}</div>
                    <div class="alert-time">${alert.time}</div>
                </div>
                <div class="alert-actions">
                    <button class="btn btn--sm btn--outline">View</button>
                    <button class="btn btn--sm btn--primary">Respond</button>
                </div>
            `;
            alertsList.appendChild(alertEl);
        });
    }

    updateActivityFeed() {
        const activityFeed = document.getElementById('activityFeed');
        if (!activityFeed) return;
        
        const now = new Date();
        const activities = [
            { 
                time: new Date(now - 2 * 60000).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }), 
                type: 'AI Detection', 
                desc: `${Math.floor(Math.random() * 5) + 1} people detected at Student Union entrance` 
            },
            { 
                time: new Date(now - 5 * 60000).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }), 
                type: 'Camera Status', 
                desc: 'All cameras operating normally - system scan complete' 
            },
            { 
                time: new Date(now - 8 * 60000).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }), 
                type: 'Security Patrol', 
                desc: 'Routine patrol completed - Academic Building sector' 
            }
        ];
        
        activityFeed.innerHTML = '';
        activities.forEach(activity => {
            const activityEl = document.createElement('div');
            activityEl.className = 'activity-item';
            activityEl.innerHTML = `
                <div class="activity-time">${activity.time}</div>
                <div class="activity-content">
                    <div class="activity-type">${activity.type}</div>
                    <div class="activity-desc">${activity.desc}</div>
                </div>
            `;
            activityFeed.appendChild(activityEl);
        });
    }

    updateLiveMetrics() {
        const metrics = this.campusData.metrics;
        metrics.peopleDetectedToday += Math.floor(Math.random() * 10) - 2;
        metrics.peopleDetectedToday = Math.max(0, metrics.peopleDetectedToday);
        
        this.updateMetricsDisplay();
        
        if (Math.random() < 0.05) {
            this.generateNewAlert();
        }
    }

    generateNewAlert() {
        const alertTypes = [
            { type: 'Motion Detection', icon: '👁️', priority: 'medium' },
            { type: 'Crowd Density Alert', icon: '👥', priority: 'high' },
            { type: 'Access Control Alert', icon: '🔒', priority: 'medium' }
        ];
        
        const locations = ['Library Entrance', 'Student Union', 'Parking Lot B', 'Academic Building'];
        
        const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        const location = locations[Math.floor(Math.random() * locations.length)];
        
        const newAlert = {
            type: alertType.type,
            location: location,
            priority: alertType.priority,
            time: 'just now',
            icon: alertType.icon
        };
        
        this.alerts.unshift(newAlert);
        this.alerts = this.alerts.slice(0, 10);
        
        if (this.currentSection === 'dashboard') {
            this.updateAlertsDisplay();
        }
        
        this.updateAlertCounts();
        this.showNotification(`🚨 New Alert: ${newAlert.type} at ${newAlert.location}`, 'warning');
    }

    updateAlerts() {
        this.alerts.forEach(alert => {
            if (alert.time === 'just now') {
                alert.time = '1 minute ago';
            } else if (alert.time.includes('minute')) {
                const minutes = parseInt(alert.time.match(/\d+/)[0]) + 1;
                alert.time = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
            }
        });
        
        if (this.currentSection === 'dashboard') {
            this.updateAlertsDisplay();
        }
    }

    loadSecurityCenter() {
        const cameraGrid = document.getElementById('cameraGrid');
        if (!cameraGrid) return;
        
        cameraGrid.innerHTML = '';
        
        this.cameraFeeds.forEach((camera) => {
            const cameraEl = document.createElement('div');
            cameraEl.className = 'camera-feed';
            cameraEl.setAttribute('data-status', camera.status);
            cameraEl.innerHTML = `
                <div class="camera-header">
                    <div class="camera-info">
                        <div class="camera-id">${camera.id}</div>
                        <div class="camera-name">${camera.name}</div>
                    </div>
                    <div class="camera-status ${camera.status}"></div>
                </div>
                <div class="camera-video">
                    ${camera.status === 'active' ? `
                        <div class="video-placeholder">
                            <div class="video-text">Live Feed Active</div>
                            <div class="detection-overlay"></div>
                        </div>
                    ` : `
                        <div class="video-placeholder offline">
                            <div class="offline-message">
                                <div class="offline-icon">📹</div>
                                <div class="offline-text">Camera Offline</div>
                            </div>
                        </div>
                    `}
                </div>
                <div class="camera-controls-bar">
                    <button class="cam-btn" title="Zoom In">🔍</button>
                    <button class="cam-btn ${camera.recording && camera.status === 'active' ? 'recording' : ''}" title="Record">⚫</button>
                    <button class="cam-btn" title="Screenshot">📸</button>
                    <button class="cam-btn" title="Pan Left">⬅️</button>
                    <button class="cam-btn" title="Pan Right">➡️</button>
                </div>
                <div class="camera-details">
                    <span class="detail">People: ${camera.peopleCount}</span>
                    <span class="detail">Vehicles: ${camera.vehicleCount}</span>
                    <span class="detail">Status: ${camera.status}</span>
                </div>
            `;
            cameraGrid.appendChild(cameraEl);
        });
    }

    updateCameraDetections() {
        document.querySelectorAll('.camera-feed[data-status="active"]').forEach(camera => {
            const detectionOverlay = camera.querySelector('.detection-overlay');
            if (detectionOverlay) {
                detectionOverlay.innerHTML = '';
                
                const numDetections = Math.floor(Math.random() * 3);
                for (let i = 0; i < numDetections; i++) {
                    const detection = document.createElement('div');
                    const isPerson = Math.random() < 0.7;
                    
                    detection.className = `detection-box ${isPerson ? 'person' : 'vehicle'}`;
                    detection.style.top = `${Math.random() * 60 + 10}%`;
                    detection.style.left = `${Math.random() * 60 + 10}%`;
                    detection.style.width = isPerson ? '40px' : '60px';
                    detection.style.height = isPerson ? '60px' : '40px';
                    
                    detectionOverlay.appendChild(detection);
                }
            }
        });
    }

    loadIncidentData() {
        const incidentsTableBody = document.getElementById('incidentsTableBody');
        if (!incidentsTableBody) return;
        
        incidentsTableBody.innerHTML = '';
        
        this.incidents.forEach(incident => {
            const row = document.createElement('tr');
            row.className = `incident-row ${incident.priority}`;
            row.innerHTML = `
                <td>${incident.time}</td>
                <td>${incident.type}</td>
                <td>${incident.location}</td>
                <td><span class="priority ${incident.priority}">${incident.priority}</span></td>
                <td><span class="status--${incident.status === 'Active' ? 'error' : incident.status === 'Resolved' ? 'success' : 'warning'}">${incident.status}</span></td>
                <td>${incident.assigned}</td>
                <td class="actions-cell">
                    <button class="btn btn--sm btn--outline">View</button>
                    <button class="btn btn--sm btn--primary">${incident.status === 'Resolved' ? 'Report' : 'Update'}</button>
                </td>
            `;
            incidentsTableBody.appendChild(row);
        });
    }

    loadAnalyticsData() {
        const chartContainer = document.getElementById('predictionChart');
        if (chartContainer) {
            const ctx = chartContainer.getContext('2d');
            ctx.clearRect(0, 0, chartContainer.width, chartContainer.height);
            ctx.fillStyle = '#94a3b8';
            ctx.font = '14px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('24-Hour Prediction Chart', chartContainer.width / 2, chartContainer.height / 2 - 10);
            ctx.fillText('Incident likelihood visualization', chartContainer.width / 2, chartContainer.height / 2 + 10);
        }
    }

    loadSettingsData() {
        document.querySelectorAll('.form-range').forEach(range => {
            this.updateRangeValue(range);
        });
    }

    handleQuickAction(actionElement) {
        const actionLabel = actionElement.querySelector('.action-label').textContent;
        
        switch(actionLabel) {
            case 'Campus Lockdown':
                if (confirm('Initiate campus lockdown?')) {
                    this.showNotification('🔒 Campus lockdown initiated', 'error');
                }
                break;
            case 'Mass Alert':
                this.showNotification('📢 Mass alert system activated', 'warning');
                break;
            case 'Deploy Patrol':
                this.showNotification('🚁 Security patrol dispatched', 'success');
                break;
            case 'Emergency Call':
                this.showNotification('📞 Emergency services contacted', 'warning');
                break;
        }
    }

    showZoneDetails(zoneMarker) {
        const zoneName = zoneMarker.querySelector('.zone-name').textContent;
        const zoneStats = zoneMarker.querySelector('.zone-stats').textContent;
        const threatLevel = zoneMarker.querySelector('.threat-indicator');
        
        let level = 'Unknown';
        if (threatLevel.classList.contains('low')) level = 'LOW';
        else if (threatLevel.classList.contains('medium')) level = 'MEDIUM';
        else if (threatLevel.classList.contains('high')) level = 'HIGH';
        
        this.showNotification(`🏢 ${zoneName}: ${zoneStats}, ${level} threat level`, 'info');
    }

    viewAlertDetails(alertElement) {
        const alertTitle = alertElement.querySelector('.alert-title').textContent;
        const alertLocation = alertElement.querySelector('.alert-location').textContent;
        this.showNotification(`📋 Viewing: ${alertTitle} at ${alertLocation}`, 'info');
    }

    respondToAlert(alertElement) {
        const alertTitle = alertElement.querySelector('.alert-title').textContent;
        alertElement.style.opacity = '0.5';
        this.showNotification(`✅ Response initiated: ${alertTitle}`, 'success');
        
        setTimeout(() => {
            alertElement.remove();
            this.updateAlertCounts();
        }, 2000);
    }

    viewIncidentDetails(row) {
        const cells = row.cells;
        document.getElementById('modalIncidentId').textContent = `INC-2024-${Math.floor(Math.random() * 1000)}`;
        document.getElementById('modalIncidentType').textContent = cells[1].textContent;
        document.getElementById('modalIncidentLocation').textContent = cells[2].textContent;
        document.getElementById('modalIncidentPriority').textContent = cells[3].textContent.trim();
        document.getElementById('modalIncidentStatus').textContent = cells[4].textContent;
        document.getElementById('modalIncidentDescription').textContent = `Detailed information about ${cells[1].textContent} incident.`;
        
        document.getElementById('incidentModal').classList.remove('hidden');
    }

    updateIncident(row) {
        const incidentType = row.cells[1].textContent;
        this.showNotification(`📝 Updated: ${incidentType}`, 'success');
    }

    closeModal() {
        const modal = document.getElementById('incidentModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    updateRangeValue(rangeInput) {
        const rangeValue = rangeInput.parentElement.querySelector('.range-value');
        if (rangeValue) {
            const value = rangeInput.value;
            rangeValue.textContent = `${value}/10`;
        }
    }

    refreshDashboard() {
        this.showNotification('🔄 Dashboard refreshed', 'success');
        
        const refreshBtn = document.getElementById('refreshDashboard');
        if (refreshBtn) {
            refreshBtn.style.transform = 'rotate(360deg)';
            setTimeout(() => refreshBtn.style.transform = '', 600);
        }
        
        this.loadDashboardData();
        this.updateSystemStatus();
    }

    saveSettings() {
        this.showNotification('⚙️ Settings saved', 'success');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(26, 31, 46, 0.95);
            color: var(--color-text);
            padding: 16px 20px;
            border-radius: 12px;
            border-left: 4px solid ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#32c8cd'};
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            max-width: 350px;
            font-size: 14px;
            backdrop-filter: blur(20px);
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.remove(), 4000);
    }
}

// Initialize immediately
if (typeof window !== 'undefined') {
    window.securityOperationsCenter = new SecurityOperationsCenter();
}

console.log('🛡️ CampusGuardian AI SOC - Ready for Operations');
console.log('🔑 Login: admin/admin');