// Fetch Projects and Blogs and Display them
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('projects-container')) {
      fetchProjects();
    }
    
    if (document.getElementById('blogs-container')) {
      fetchBlogs();
    }
  });
  
  function fetchProjects() {
    fetch('http://localhost:5000/projects')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('projects-container');
        data.forEach(project => {
          const projectElem = document.createElement('div');
          projectElem.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <img src="${project.image}" alt="${project.title}" width="200">
            <a href="${project.link}" target="_blank">View Project</a>
          `;
          container.appendChild(projectElem);
        });
      })
      .catch(err => console.error('Error:', err));
  }
  
  function fetchBlogs() {
    fetch('http://localhost:5000/blogs')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('blogs-container');
        data.forEach(blog => {
          const blogElem = document.createElement('div');
          blogElem.innerHTML = `
            <h3>${blog.title}</h3>
            <p>${blog.content}</p>
            <small>Posted on: ${new Date(blog.date).toLocaleDateString()}</small>
          `;
          container.appendChild(blogElem);
        });
      })
      .catch(err => console.error('Error:', err));
  }
  