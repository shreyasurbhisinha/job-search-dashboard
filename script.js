$(document).ready(function () {
    // Sample job data with Indian titles, companies, and locations
    const jobs = [
      {
        id: 1,
        title: 'Frontend Developer',
        company: 'Tata Consultancy Services',
        location: 'Mumbai',
        description: 'Develop modern, responsive web applications for clients across industries.'
      },
      {
        id: 2,
        title: 'Backend Engineer',
        company: 'Infosys',
        location: 'Bangalore',
        description: 'Maintain and optimize server-side logic for enterprise applications.'
      },
      {
        id: 3,
        title: 'UI/UX Designer',
        company: 'Wipro',
        location: 'Hyderabad',
        description: 'Design intuitive user interfaces and enhance user experiences.'
      }
    ];
  
    // Load job listings initially with animation
    loadJobListings(jobs);
  
    // Job search form submission
    $('#job-search-form').on('submit', function (e) {
      e.preventDefault();
      const keyword = $('#keyword').val().toLowerCase();
      const location = $('#location').val().toLowerCase();
      
      const filteredJobs = jobs.filter(job => {
        return job.title.toLowerCase().includes(keyword) &&
          job.location.toLowerCase().includes(location);
      });
  
      // Clear and reload the job listings with animation
      $('#job-listings').fadeOut(300, function() {
        loadJobListings(filteredJobs);
        $('#job-listings').fadeIn(300);
      });
    });
  
    // Search suggestions (autocomplete-like behavior)
    $('#keyword').on('input', function() {
      const keyword = $(this).val().toLowerCase();
      const suggestions = jobs.filter(job => job.title.toLowerCase().includes(keyword));
      
      if (keyword && suggestions.length > 0) {
        let suggestionHTML = '<ul class="bg-white p-4 border rounded">';
        suggestions.forEach(s => {
          suggestionHTML += `<li class="py-1">${s.title}</li>`;
        });
        suggestionHTML += '</ul>';
        $('#suggestions').html(suggestionHTML).slideDown(300);
      } else {
        $('#suggestions').slideUp(300);
      }
    });
  
    // Function to load job listings
    function loadJobListings(jobs) {
      $('#job-listings').empty();
      
      jobs.forEach(job => {
        const jobCard = `
          <div class="bg-white p-4 rounded shadow-lg transition hover:shadow-xl">
            <h3 class="text-xl font-bold">${job.title}</h3>
            <p class="text-gray-700">${job.company} - ${job.location}</p>
            <button class="view-details bg-blue-500 text-white px-4 py-2 mt-4 rounded" data-id="${job.id}">View Details</button>
            <button class="track-job bg-green-500 text-white px-4 py-2 mt-4 ml-2 rounded" data-id="${job.id}">Track Application</button>
          </div>
        `;
        $('#job-listings').append(jobCard);
      });
    }
  
    // Job details modal handling
    $(document).on('click', '.view-details', function () {
      const jobId = $(this).data('id');
      const job = jobs.find(j => j.id === jobId);
      
      $('#job-title').text(job.title);
      $('#job-company').text(job.company);
      $('#job-description').text(job.description);
      
      $('#job-modal').fadeIn(300);
    });
  
    // Close modal
    $('#close-modal').on('click', function () {
      $('#job-modal').fadeOut(300);
    });
  
    // Track application handling
    $(document).on('click', '.track-job', function () {
      const jobId = $(this).data('id');
      const job = jobs.find(j => j.id === jobId);
      
      const trackedJob = `
        <div class="bg-gray-100 p-4 rounded shadow-lg flex justify-between items-center">
          <div>
            <h4 class="text-lg font-bold">${job.title}</h4>
            <p class="text-gray-600">${job.company} - ${job.location}</p>
          </div>
          <button class="remove-tracked bg-red-500 text-white px-4 py-2 rounded" data-id="${job.id}">Remove</button>
        </div>
      `;
      
      $('#application-tracker').append(trackedJob);
    });
  
    // Remove tracked job
    $(document).on('click', '.remove-tracked', function () {
      $(this).parent().slideUp(300, function() {
        $(this).remove();
      });
    });
  });
  