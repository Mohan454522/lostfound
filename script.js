class LostAndFoundApp {
    constructor() {
        this.items = this.loadItems();
        this.init();
    }

    init() {
        // Set today's date as default
        document.getElementById('date').valueAsDate = new Date();
        
        // Load initial data
        this.displayItems();
        
        // Add form event listener
        document.getElementById('reportForm').addEventListener('submit', (e) => {
            this.handleSubmit(e);
        });
    }

    loadItems() {
        // Load from localStorage or return sample data
        const stored = localStorage.getItem('lostFoundItems');
        if (stored) {
            return JSON.parse(stored);
        }
        
        // Sample data for demonstration
        return [
            {
                id: 1,
                type: 'electronics',
                name: 'iPhone 13 Pro',
                description: 'Black iPhone 13 Pro with blue case',
                location: 'Main Library - 2nd Floor',
                date: '2024-01-15',
                contact: 'john@email.com',
                reportType: 'lost'
            },
            {
                id: 2,
                type: 'documents',
                name: 'Student ID Card',
                description: 'University student ID - Name: Sarah Johnson',
                location: 'Student Center Cafeteria',
                date: '2024-01-16',
                contact: '555-0123',
                reportType: 'found'
            }
        ];
    }

    saveItems() {
        localStorage.setItem('lostFoundItems', JSON.stringify(this.items));
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = {
            id: Date.now(), // Simple ID generation
            type: document.getElementById('itemType').value,
            name: document.getElementById('itemName').value,
            description: document.getElementById('description').value,
            location: document.getElementById('location').value,
            date: document.getElementById('date').value,
            contact: document.getElementById('contact').value,
            reportType: document.querySelector('input[name="reportType"]:checked').value
        };

        this.items.push(formData);
        this.saveItems();
        this.displayItems();
        
        // Reset form and switch to appropriate tab
        document.getElementById('reportForm').reset();
        document.getElementById('date').valueAsDate = new Date();
        this.openTab(formData.reportType);
        
        // Show success message
        alert('Item reported successfully!');
    }

    displayItems() {
        this.displayLostItems();
        this.displayFoundItems();
    }

    displayLostItems() {
        const container = document.getElementById('lostItemsList');
        const lostItems = this.items.filter(item => item.reportType === 'lost');
        
        container.innerHTML = lostItems.length > 0 
            ? lostItems.map(item => this.createItemCard(item)).join('')
            : '<div class="no-items">No lost items reported yet.</div>';
    }

    displayFoundItems() {
        const container = document.getElementById('foundItemsList');
        const foundItems = this.items.filter(item => item.reportType === 'found');
        
        container.innerHTML = foundItems.length > 0 
            ? foundItems.map(item => this.createItemCard(item)).join('')
            : '<div class="no-items">No found items reported yet.</div>';
    }

    createItemCard(item) {
        const typeLabels = {
            electronics: '📱 Electronics',
            documents: '📄 Documents',
            clothing: '👕 Clothing',
            accessories: '👓 Accessories',
            books: '📚 Books',
            other: '📦 Other'
        };

        return `
            <div class="item-card">
                <div class="item-header">
                    <span class="item-type">${typeLabels[item.type] || typeLabels.other}</span>
                    <span class="item-status ${item.reportType}">
                        ${item.reportType === 'lost' ? '🔴 LOST' : '🟢 FOUND'}
                    </span>
                </div>
                <div class="item-name">${item.name}</div>
                <div class="item-detail">📍 ${item.location}</div>
                <div class="item-detail">📅 ${new Date(item.date).toLocaleDateString()}</div>
                <div class="item-detail">${item.description}</div>
                <div class="item-detail">📞 Contact: ${item.contact}</div>
            </div>
        `;
    }
}

// Tab functionality
function openTab(tabName) {
    // Hide all tab content
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }

    // Remove active class from all buttons
    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }

    // Show specific tab content and activate button
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LostAndFoundApp();
});

// Clear localStorage when page is about to be unloaded (optional)
window.addEventListener('beforeunload', () => {
    // Uncomment the line below if you want to clear data when leaving the page
    // localStorage.removeItem('lostFoundItems');
});