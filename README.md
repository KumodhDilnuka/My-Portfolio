# 🚀 IT Student Portfolio

A modern, responsive portfolio website for IT students built with HTML, CSS, and JavaScript. This portfolio showcases your skills, projects, and experience in a professional and visually appealing way.

## ✨ Features

- **Responsive Design**: Works perfectly on all devices (desktop, tablet, mobile)
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: Typing animation, skill bars, hover effects
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Contact Form**: Functional contact form with validation
- **Smooth Scrolling**: Seamless navigation between sections
- **SEO Optimized**: Semantic HTML structure
- **Fast Loading**: Optimized performance

## 🎯 Sections Included

1. **Hero Section**: Eye-catching introduction with animated text
2. **About Me**: Personal introduction and statistics
3. **Skills**: Interactive skill bars with categories
4. **Projects**: Showcase of your best work
5. **Contact**: Contact form and information
6. **Footer**: Social links and copyright

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript**: Interactive functionality
- **Font Awesome**: Icons
- **Google Fonts**: Typography (Poppins)

## 📁 File Structure

```
My-Portfolio/
├── index.html          # Main HTML file
├── style.css           # CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🚀 Quick Start

### 1. Clone or Download

If you're starting fresh:
1. Download all files to your computer
2. Open `index.html` in your browser to preview

### 2. Customize Your Content

Replace the placeholder content with your own information:

#### Update Personal Information
- Replace "Your Name" with your actual name
- Update the hero section description
- Change the contact information (email, phone, location)

#### Add Your Skills
- Modify the skills in the Skills section
- Adjust the skill percentages (data-width attributes)
- Add or remove skill categories

#### Update Projects
- Replace example projects with your own
- Add project links (GitHub repos, live demos)
- Update project descriptions and technologies used

#### Social Media Links
- Update social media links in the hero and footer sections
- Add your GitHub, LinkedIn, Twitter profiles

### 3. Customize Styling

#### Colors
The CSS uses CSS variables for easy color customization:

```css
:root {
    --primary-color: #667eea;      /* Main brand color */
    --secondary-color: #764ba2;    /* Secondary brand color */
    --accent-color: #f093fb;       /* Accent color */
    --text-dark: #2d3748;          /* Dark text */
    --text-light: #718096;         /* Light text */
}
```

#### Fonts
Currently using Google Fonts (Poppins). To change:
1. Update the Google Fonts link in `index.html`
2. Update the font-family in CSS

## 🌐 Hosting on GitHub Pages

### Step 1: Create GitHub Repository

1. **Create a GitHub account** (if you don't have one):
   - Go to [github.com](https://github.com)
   - Click "Sign up" and create your account

2. **Create a new repository**:
   - Click the "+" icon in the top right
   - Select "New repository"
   - Name it `your-username.github.io` (replace with your GitHub username)
   - Make sure it's **Public**
   - Don't initialize with README (since you already have files)
   - Click "Create repository"

### Step 2: Upload Your Files

#### Option A: Using GitHub Website (Easier for beginners)

1. In your new repository, click "uploading an existing file"
2. Drag and drop all your portfolio files (`index.html`, `style.css`, `script.js`, `README.md`)
3. Write a commit message like "Initial portfolio upload"
4. Click "Commit changes"

#### Option B: Using Git Commands (Recommended)

1. **Initialize Git in your project folder**:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   ```

2. **Connect to your GitHub repository**:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
   git branch -M main
   git push -u origin main
   ```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"

### Step 4: Access Your Live Website

- Your website will be available at: `https://your-username.github.io`
- It may take a few minutes to go live
- You'll see a green checkmark when it's ready

## 🔧 Advanced Customization

### Adding New Sections

1. Add HTML structure in `index.html`
2. Add corresponding CSS styles in `style.css`
3. Update navigation menu if needed
4. Add JavaScript functionality if required

### Adding More Projects

Copy the project card structure and modify:

```html
<div class="project-card">
    <div class="project-image">
        <i class="fas fa-your-icon"></i>
    </div>
    <div class="project-info">
        <h3>Your Project Name</h3>
        <p>Project description...</p>
        <div class="project-tech">
            <span>Technology 1</span>
            <span>Technology 2</span>
        </div>
        <div class="project-links">
            <a href="your-github-link" target="_blank">
                <i class="fab fa-github"></i> Code
            </a>
            <a href="your-demo-link" target="_blank">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
        </div>
    </div>
</div>
```

### Contact Form Integration

The current contact form uses JavaScript validation. To make it functional:

1. **Use a form service** like:
   - [Formspree](https://formspree.io/) (Free)
   - [Netlify Forms](https://www.netlify.com/products/forms/) (Free)
   - [EmailJS](https://www.emailjs.com/) (Free tier available)

2. **Example with Formspree**:
   ```html
   <form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

## 📱 Mobile Optimization

The portfolio is fully responsive and includes:
- Mobile navigation menu
- Responsive grid layouts
- Touch-friendly buttons
- Optimized font sizes
- Proper viewport settings

## 🎨 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+

## 📈 Performance Tips

1. **Optimize images**: Use compressed images (WebP format when possible)
2. **Minimize HTTP requests**: Keep external resources minimal
3. **Enable caching**: GitHub Pages automatically handles this
4. **Monitor Core Web Vitals**: Use Google PageSpeed Insights

## 🆘 Troubleshooting

### Common Issues:

1. **Website not loading on GitHub Pages**:
   - Check that your main file is named `index.html`
   - Ensure repository is public
   - Wait 5-10 minutes for changes to propagate

2. **Fonts not loading**:
   - Check Google Fonts link in HTML
   - Ensure internet connection for CDN resources

3. **JavaScript not working**:
   - Check browser console for errors
   - Ensure `script.js` is properly linked

4. **Mobile menu not working**:
   - Verify JavaScript is loaded
   - Check that Font Awesome icons are loading

## 🤝 Contributing

Feel free to fork this project and customize it for your needs! If you make improvements, consider sharing them.

## 📄 License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

## 🙏 Credits

- **Font Awesome**: For the icons
- **Google Fonts**: For the Poppins font family
- **CSS Gradient**: For the beautiful color gradients

## 📞 Support

If you need help or have questions:
1. Check this README first
2. Search for similar issues online
3. Ask for help in coding communities
4. Review the code comments for guidance

---

**Happy Coding! 🚀**

*Remember to customize this portfolio to reflect your unique skills and personality. Good luck with your IT career!*

## 📧 Contact Form Setup

The contact form uses EmailJS to send emails directly from your website without a backend server.

### Step 1: Create EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/)
2. Create a free account
3. Verify your email address

### Step 2: Setup Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Note down your **Service ID**

### Step 3: Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template structure:
   ```
   Subject: New Contact Form Message - {{subject}}
   
   From: {{from_name}}
   Email: {{from_email}}
   Subject: {{subject}}
   
   Message:
   {{message}}
   
   ---
   Sent from your portfolio contact form
   ```
4. Save and note down your **Template ID**

### Step 4: Get Your Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key**

### Step 5: Update Your Portfolio
1. Open `script.js`
2. Replace the placeholders:
   ```javascript
   emailjs.init("YOUR_PUBLIC_KEY"); // Your actual public key
   
   emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', '#contact-form')
   ```

### Example Configuration:
```javascript
// Replace these with your actual values
emailjs.init("user_abc123xyz789"); 
emailjs.sendForm('service_gmail', 'template_contact', '#contact-form')
```

### Testing
1. Fill out your contact form
2. Check your email for the message
3. Verify the sender's email appears correctly

## 🚀 Alternative Contact Form Options

If you prefer different solutions:

### Option 1: Formspree (Simple)
1. Go to [Formspree](https://formspree.io/)
2. Create account and get form endpoint
3. Update form action: `<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`

### Option 2: Netlify Forms (If hosting on Netlify)
1. Add `netlify` attribute to form: `<form netlify>`
2. Deploy to Netlify
3. View submissions in Netlify dashboard

### Option 3: Google Forms
1. Create a Google Form
2. Use form embed or custom styling
3. Responses go to Google Sheets

## 📱 View Messages

**EmailJS**: Messages arrive in your email inbox
**Formspree**: View in dashboard + email notifications  
**Netlify**: View in Netlify dashboard under Forms
**Google Forms**: View in Google Forms responses or linked Google Sheet

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Poppins)
- **Email Service**: EmailJS
- **Responsive Design**: Mobile-first approach

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── style.css           # Stylesheet
├── script.js           # JavaScript functionality
├── README.md           # Project documentation
└── images/             # Project images and profile photo
    ├── Mypicture.jpg
    ├── CoirTrack.png
    ├── Personal Expense Tracker.png
    ├── Train Reservation System.jpeg
    └── KD Trading App & Wallet.png
```

## 🚀 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: (leave empty for static site)
3. Set publish directory: `/` or `./`
4. Deploy automatically on each commit

### Vercel
1. Connect your GitHub repository to Vercel
2. Deploy with default settings
3. Get automatic deployments on each push

## 📞 Contact Information

- **Email**: kumodhdilnuka285@gmail.com
- **Phone**: +94 76 806 9907
- **Location**: Colombo, Sri Lanka
- **University**: SLIIT, Malabe

## 🔗 Social Media

- **GitHub**: [KumodhDilnuka](https://github.com/KumodhDilnuka)
- **LinkedIn**: [kumodh-dilnuka](https://www.linkedin.com/in/kumodh-dilnuka-02b318370)
- **Twitter**: [@kumodhdilnuka](https://x.com/kumodhdilnuka)
- **Instagram**: [@kumodhdilnuka](https://www.instagram.com/kumodhdilnuka)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by Kumodh Dilnuka** 