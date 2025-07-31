const apiKey = "9e661f31a4msh66a5b3a57f407c5p154327jsn81046633f2e0"; // Replace with your actual RapidAPI key

const searchButton = document.querySelector('.search-box button');
const searchInput = document.getElementById("searchInput");
const locationInput = document.getElementById("locationInput");
const results = document.getElementById('results');

async function searchJobs() {
  const query = searchInput.value.trim();
  const location = locationInput.value.trim();

  const selectedTypes = Array.from(document.querySelectorAll('input[name="jobType"]:checked'))
    .map(cb => cb.value)
    .join(" ");

  let fullQuery = `${query} in ${location} ${selectedTypes}`;

  const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(fullQuery)}&page=1&num_pages=1`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  };

  try {
    setLoading(true);
    const res = await fetch(url, options);
    const data = await res.json();
    displayJobs(data.data);
  } catch (error) {
    console.error(error);
    results.innerHTML = '<p>Error fetching jobs. Try again later.</p>';
  } finally {
    setLoading(false);
  }
}

function displayJobs(jobs) {
  results.innerHTML = "";

  if (!jobs || jobs.length === 0) {
    results.innerHTML = "<p>No jobs found.</p>";
    return;
  }

  jobs.forEach(job => {
    const jobCard = document.createElement('div');
    jobCard.className = 'job-card fade-in';
    jobCard.innerHTML = `
      <h3>${job.job_title}</h3>
      <p><strong>Company:</strong> ${job.employer_name}</p>
      <p><strong>Location:</strong> ${job.job_city}, ${job.job_country}</p>
      <p>${job.job_description.slice(0, 150)}...</p>
      <span class="badge">${job.job_employment_type}</span><br/>
      <a href="${job.job_apply_link}" target="_blank" rel="noopener noreferrer">Apply Now</a>
    `;
    results.appendChild(jobCard);
  });
}

function setLoading(isLoading) {
  if (isLoading) {
    searchButton.disabled = true;
    results.innerHTML = '<div class="loading-spinner"></div><p>Loading jobs...</p>';
  } else {
    searchButton.disabled = false;
  }
}

// Enable pressing Enter key to trigger search
searchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    searchJobs();
  }
});
locationInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    searchJobs();
  }
});
