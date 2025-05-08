// Course page specific functionality
class CoursePage {
    constructor() {
        this.init();
    }

    init() {
        this.handleVideoResponsiveness();
        this.handleInstructorImageResponsiveness();
        this.setupEventListeners();
        this.adjustLayout();
    }

    handleVideoResponsiveness() {
        const courseVideo = document.querySelector('.course-video');
        if (courseVideo) {
            courseVideo.style.width = '100%';
            courseVideo.style.maxHeight = '400px';
            courseVideo.style.objectFit = 'cover';
        }
    }

    handleInstructorImageResponsiveness() {
        const instructorImage = document.querySelector('.instructor-image');
        if (instructorImage) {
            instructorImage.style.maxWidth = '100%';
            instructorImage.style.height = 'auto';
        }
    }

    setupEventListeners() {
        // Handle window resize with debounce
        window.addEventListener('resize', this.debounce(() => {
            this.adjustLayout();
        }, 250));

        // Handle image errors
        document.addEventListener('error', (e) => {
            if (e.target.tagName.toLowerCase() === 'img') {
                e.target.src = '../../image/placeholder.png';
                e.target.alt = 'صورة غير متوفرة';
            }
        }, true);

        // Handle video loading
        const courseVideo = document.querySelector('.course-video');
        if (courseVideo) {
            courseVideo.addEventListener('loadedmetadata', () => {
                this.adjustVideoSize(window.innerWidth);
            });
        }
    }

    adjustLayout() {
        const width = window.innerWidth;
        const content = document.querySelector('.content');
        const rightCard = document.querySelector('.right-card');
        const leftContent = document.querySelector('.left-content');

        if (width <= 992) {
            if (content) {
                content.style.flexDirection = 'column';
                content.style.alignItems = 'center';
            }
            if (rightCard) {
                rightCard.style.marginBottom = '30px';
            }
        } else {
            if (content) {
                content.style.flexDirection = 'row';
            }
            if (rightCard) {
                rightCard.style.marginBottom = '0';
            }
        }

        this.adjustVideoSize(width);
        this.adjustTextSizes(width);
    }

    adjustVideoSize(width) {
        const courseVideo = document.querySelector('.course-video');
        if (courseVideo) {
            if (width <= 576) {
                courseVideo.style.maxHeight = '300px';
            } else {
                courseVideo.style.maxHeight = '400px';
            }
        }
    }

    adjustTextSizes(width) {
        const title = document.querySelector('#title');
        const description = document.querySelector('#right-description');
        const leftDescription = document.querySelector('#left-description');

        if (width <= 576) {
            if (title) title.style.fontSize = '22px';
            if (description) description.style.fontSize = '16px';
            if (leftDescription) leftDescription.style.fontSize = '16px';
        } else if (width <= 768) {
            if (title) title.style.fontSize = '24px';
            if (description) description.style.fontSize = '16px';
            if (leftDescription) leftDescription.style.fontSize = '18px';
        } else if (width <= 992) {
            if (title) title.style.fontSize = '28px';
            if (description) description.style.fontSize = '16px';
            if (leftDescription) leftDescription.style.fontSize = '18px';
        } else {
            if (title) title.style.fontSize = '32px';
            if (description) description.style.fontSize = '14px';
            if (leftDescription) leftDescription.style.fontSize = '20px';
        }
    }

    // Utility function for debouncing
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize course page functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CoursePage();
}); 