function loadContentFromJSON() {
    fetch('https://buaaerjys.us.kg/static/json/homeLeft.json')
        .then(response => response.json())
        .then(data => {
            // 加载logo
            document.querySelector('.logo').style.backgroundImage = `url(${data.logo.backgroundImage})`;
            document.querySelector('.logo img').src = data.logo.headwear;
            document.querySelector('.iconItem').href = data.logo.githubLink;

            // 加载tags
            const tagContainer = document.querySelector('.left-tag');
            data.tags.forEach(tag => {
                let tagItem = document.createElement('div');
                tagItem.className = 'left-tag-item';
                tagItem.textContent = tag;
                tagContainer.appendChild(tagItem);
            });

            // 加载timeline
            const timelineContainer = document.getElementById('line');
            data.timeline.forEach(entry => {
                let listItem = document.createElement('li');

                let focusDiv = document.createElement('div');
                focusDiv.className = 'focus';
                listItem.appendChild(focusDiv);

                let eventDiv = document.createElement('div');
                eventDiv.textContent = entry.event;
                listItem.appendChild(eventDiv);

                let dateDiv = document.createElement('div');
                dateDiv.textContent = entry.date;
                listItem.appendChild(dateDiv);

                timelineContainer.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error loading JSON data:', error));

    fetch('https://buaaerjys.us.kg/static/json/homeMain.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('content-container');

            // Loop through sections
            data.sections.forEach(section => {
                // Create section title
                const titleDiv = document.createElement('div');
                titleDiv.classList.add('title');

                const titleLink = document.createElement('a');
                titleLink.href = section.link;
                titleLink.target = '_blank';
                titleLink.rel = 'noopener noreferrer';

                const svg = document.createElement('img'); // Use <img> for SVGs
                svg.src = section.svg;
                svg.width = 26;   // Set SVG width to 26
                svg.height = 26;  // Set SVG height to 26
                svg.style.marginRight = '8px';  // Add margin-right 8px

                const titleText = document.createElement('span');
                titleText.classList.add('title-text');
                titleText.textContent = section.title;

                titleLink.appendChild(svg);
                titleLink.appendChild(titleText);
                titleDiv.appendChild(titleLink);
                container.appendChild(titleDiv);

                // Loop through projects
                const projectList = document.createElement('div');
                projectList.classList.add('projectList');

                section.projects.forEach(project => {
                    const projectItem = document.createElement('a');
                    projectItem.classList.add('projectItem', 'a');
                    projectItem.href = project.link;
                    projectItem.target = '_blank';

                    const projectItemLeft = document.createElement('div');
                    projectItemLeft.classList.add('projectItemLeft');
                    const h1 = document.createElement('h1');
                    h1.textContent = project.name;
                    const p = document.createElement('p');
                    p.textContent = project.description;
                    projectItemLeft.appendChild(h1);
                    projectItemLeft.appendChild(p);

                    const projectItemRight = document.createElement('div');
                    projectItemRight.classList.add('projectItemRight');
                    const img = document.createElement('img');
                    img.src = project.image;
                    projectItemRight.appendChild(img);

                    projectItem.appendChild(projectItemLeft);
                    projectItem.appendChild(projectItemRight);
                    projectList.appendChild(projectItem);
                });

                container.appendChild(projectList);
            });
        })
        .catch(error => console.error('Error fetching content:', error));
}

window.onload = loadContentFromJSON;
