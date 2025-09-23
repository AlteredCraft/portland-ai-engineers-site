# Portland AI Engineers Website

A modern, responsive website for Portland AI Engineers - a community of software developers exploring generative AI through hands-on experimentation.

## About Portland AI Engineers

Portland AI Engineers is a vibrant community focused on:
- Building practical AI applications
- Sharing knowledge through presentations and meetups
- Connecting developers across all experience levels
- Fostering innovation in AI development

## Pages

- **Home** - Community overview, upcoming events, and call-to-actions
- **About** - Mission, values, and community principles
- **Sponsorship** - Sponsorship tiers and benefits for organizations
- **Present** - Guidelines for submitting and presenting at meetups

## Running Locally

### Option 1: Simple HTTP Server (Python)

If you have Python installed:

```bash
# Python
uv run python -m http.server 8000

```

Then open your browser and navigate to: `http://localhost:8000`

### Option 2: Node.js HTTP Server

If you have Node.js installed:

```bash
# Install http-server globally (one time)
npm install -g http-server

# Run the server
http-server -p 8000
```

Then open your browser and navigate to: `http://localhost:8000`


## Deployment to GitHub Pages

1. **Create a GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/AlteredCraft/portland-ai-engineers-site.git
   git push -u origin main
   ```

2. **Enable GitHub Pages (this has been done)**
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click Save

3. **Access Your Site**
   - Your site will be available at: `https://AlteredCraft.github.io/portland-ai-engineers-site/`
   - It may take a few minutes for the site to become available

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styles with CSS variables
- **JavaScript** - Vanilla JS for interactivity
- **Bootstrap 5** - Responsive grid and components
- **Bootstrap Icons** - Icon library
- **Google Fonts** - Inter font family

## Customization

### Updating Content
- Edit the HTML files directly to update text content
- Event information is in `index.html` in the "Upcoming Events" section
- Sponsor logos are in the footer of all pages


### Adding New Pages
1. Create a new HTML file
2. Copy the navigation and footer from existing pages
3. Update the navigation links to mark the current page as active
4. Add your content in the main section

## Contact

- **Email**: info@portlandai.engineer
- **Meetup**: https://www.meetup.com/portland-ai-engineers/
