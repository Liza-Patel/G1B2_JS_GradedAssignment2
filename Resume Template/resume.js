let applicants = [];
let originalApplicants = [];
let currentApplicantIndex = 0;

// Load JSON data from data.json file
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        originalApplicants = data.resume;
        applicants = [...originalApplicants];
        if (window.location.pathname.includes('resume.html')) {
            if (applicants.length > 0) {
                displayApplicant(currentApplicantIndex);
            } else {
                document.querySelector('.resume-body').innerText = 'No applicants found.';
            }
        }
    })
    .catch(error => console.error('Error fetching data:', error));



// Ensure the user is logged in before showing the resume page
window.onload = function () {
    // Check if user is logged in, otherwise redirect to login page
    if (localStorage.getItem('loggedIn') !== 'true') {
        window.location.href = 'login.html';
    }
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
        window.history.go(1);
    };
};

function logout() {
    // Clear the logged-in status
    localStorage.removeItem('loggedIn');

    // Optionally clear any stored username/password (if stored separately)
    localStorage.removeItem('username');
    localStorage.removeItem('password');

    // Redirect to the login page
    window.location.href = 'login.html';
}



// Function to display an applicant's resume
function displayApplicant(index) {
    if (index < 0 || index >= applicants.length) {
        document.querySelector('.resume-body').innerHTML = 'No applicant data available.';
        return;
    }

    const applicant = applicants[index];
    document.getElementById('applicant-name').innerText = applicant.basics.name || 'N/A';
    const appliedForHTML = `
        <strong>Applied For:</strong> <strong>${applicant.basics.AppliedFor || 'N/A'}</strong>
    `;
    const appliedForElement = document.getElementById('applicant-position');
    appliedForElement.innerHTML = appliedForHTML;


    document.getElementById('personal-info').innerHTML = `
        <h3>Personal Information</h3>
        <p><strong>Email:</strong> ${applicant.basics.email || 'N/A'}</p>
        <p><strong>Phone:</strong> ${applicant.basics.phone || 'N/A'}</p>
        <p><strong>Location:</strong> ${applicant.basics.location?.address || 'N/A'}, ${applicant.basics.location?.city || 'N/A'}, ${applicant.basics.location?.state || 'N/A'}, ${applicant.basics.location?.postalCode || 'N/A'}</p>
        <p><strong><a href="${applicant.basics.profiles?.url || '#'}" target="_blank">LinkedIn</a></strong></p>
    `;

    document.getElementById('skills').innerHTML = `
        <h3>Technical Skills</h3>
        <p><strong>Name:</strong> ${applicant.skills.name || 'N/A'}</p>
        <p><strong>Level:</strong> ${applicant.skills.level || 'N/A'}</p>
        <p><strong>Keywords:</strong> ${applicant.skills.keywords?.join(', ') || 'N/A'}</p>
    `;

    if (applicant.work) {
        document.getElementById('work-experience').innerHTML = `
            <h3>Work Experience</h3>
            <p><strong>Company Name:</strong> ${applicant.work['Company Name'] || 'N/A'}</p>
            <p><strong>Position:</strong> ${applicant.work.Position || 'N/A'}</p>
            <p><strong>Start Date:</strong> ${applicant.work['Start Date'] || 'N/A'}</p>
            <p><strong>End Date:</strong> ${applicant.work['End Date'] || 'N/A'}</p>
            <p><strong>Summary:</strong> ${applicant.work.Summary || 'N/A'}</p>
        `;
    } else {
        document.getElementById('work-experience').innerHTML = '<h3>Work Experience</h3><p>No work experience available.</p>';
    }

    if (applicant.projects) {
        document.getElementById('projects').innerHTML = `
            <h3>Projects</h3>
            <p><strong>Project Name:</strong> ${applicant.projects.name || 'N/A'}</p>
            <p><strong>Description:</strong> ${applicant.projects.description || 'N/A'}</p>
        `;
    } else {
        document.getElementById('projects').innerHTML = '<h3>Projects</h3><p>No projects available.</p>';
    }

    if (applicant.education) {
        document.getElementById('education').innerHTML = `
            <h3>Education</h3>
            <p><strong>UG:</strong> ${applicant.education.UG?.course || 'N/A'} from ${applicant.education.UG?.institute || 'N/A'} (${applicant.education.UG?.StartDate || 'N/A'} - ${applicant.education.UG?.EndDate || 'N/A'}, CGPA: ${applicant.education.UG?.cgpa || 'N/A'})</p>
            <p><strong>Senior Secondary:</strong> ${applicant.education['Senior Secondary']?.institute || 'N/A'}, CGPA: ${applicant.education['Senior Secondary']?.cgpa || 'N/A'}</p>
            <p><strong>High School:</strong> ${applicant.education['High School']?.institute || 'N/A'}, CGPA: ${applicant.education['High School']?.cgpa || 'N/A'}</p>
        `;
    } else {
        document.getElementById('education').innerHTML = '<h3>Education</h3><p>No education details available.</p>';
    }

    if (applicant.Internship) {
        document.getElementById('internship').innerHTML = `
            <h3>Internship</h3>
            <p><strong>Company Name:</strong> ${applicant.Internship['Company Name'] || 'N/A'}</p>
            <p><strong>Position:</strong> ${applicant.Internship.Position || 'N/A'}</p>
            <p><strong>Start Date:</strong> ${applicant.Internship['Start Date'] || 'N/A'}</p>
            <p><strong>End Date:</strong> ${applicant.Internship['End Date'] || 'N/A'}</p>
            <p><strong>Summary:</strong> ${applicant.Internship.Summary || 'N/A'}</p>
        `;
    } else {
        document.getElementById('internship').innerHTML = '<h3>Internship</h3><p>No internship details available.</p>';
    }

    document.getElementById('achievements').innerHTML = `
        <h3>Achievements</h3>
        <ul>${applicant.achievements?.Summary?.map(achievement => `<li>${achievement}</li>`).join('') || '<p>No achievements available.</p>'}</ul>
    `;

    document.getElementById('interests').innerHTML = `
        <h3>Hobbies</h3>
        <ul>${applicant.interests?.hobbies?.map(hobby => `<li>${hobby}</li>`).join('') || '<p>No interests available.</p>'}</ul>
    `;

    // Hide navigation buttons if only one applicant is found
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');

    if (applicants.length <= 1) {
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
    } else {
        prevButton.style.display = (currentApplicantIndex === 0) ? 'none' : 'inline-block';
        nextButton.style.display = (currentApplicantIndex === applicants.length - 1) ? 'none' : 'inline-block';
    }
}

// Navigate to the next applicant
function nextApplicant() {
    if (applicants.length > 0 && currentApplicantIndex < applicants.length - 1) {
        currentApplicantIndex++;
        displayApplicant(currentApplicantIndex);
    }
}

// Navigate to the previous applicant
function previousApplicant() {
    if (applicants.length > 0 && currentApplicantIndex > 0) {
        currentApplicantIndex--;
        displayApplicant(currentApplicantIndex);
    }
}

// Function to filter applicants by the position they applied for
function filterApplicants() {
    const searchValue = document.getElementById('search').value.toLowerCase();

    if (searchValue === '') {
        // Reset to original list if search is empty
        applicants = [...originalApplicants];
        currentApplicantIndex = 0; // Reset to the first applicant
    } else {
        // Filter applicants based on the search value
        applicants = originalApplicants.filter(applicant =>
            applicant.basics.AppliedFor.toLowerCase().includes(searchValue)
        );
        currentApplicantIndex = 0; // Reset to the first applicant in the filtered list
    }

    // Display the results or a message if no applicants are found
    if (applicants.length > 0) {
        displayApplicant(currentApplicantIndex);
        document.getElementById('error-container').style.display = 'none';
        document.querySelector('.resume-container').classList.remove('hidden');

        if (applicants.length === 1) {
            // Hide both buttons if there's only one applicant
            document.getElementById('prev-btn').style.display = 'none';
            document.getElementById('next-btn').style.display = 'none';
        } else if (currentApplicantIndex === 0) {
            // Show only the "Next" button if on the first applicant
            document.getElementById('prev-btn').style.display = 'none';
            document.getElementById('next-btn').style.display = 'inline-block';
        } else if (currentApplicantIndex > 0 && currentApplicantIndex < applicants.length - 1) {
            // Show both "Next" and "Previous" buttons if in the middle
            document.getElementById('prev-btn').style.display = 'inline-block';
            document.getElementById('next-btn').style.display = 'inline-block';
        } else if (currentApplicantIndex === applicants.length - 1) {
            // Show only the "Previous" button if on the last applicant
            document.getElementById('prev-btn').style.display = 'inline-block';
            document.getElementById('next-btn').style.display = 'none';
        }
    } else {
        // Show error and hide buttons if no applicants are found
        document.getElementById('error-container').style.display = 'flex';
        document.querySelector('.resume-container').classList.add('hidden');
        document.getElementById('prev-btn').style.display = 'none';
        document.getElementById('next-btn').style.display = 'none';
    }


}

// Trigger filter function on search input
document.getElementById('search').addEventListener('input', filterApplicants);

// Function to show/hide the clear button based on input
document.getElementById('search').addEventListener('input', function () {
    const clearButton = document.getElementById('clear-search');
    if (this.value.length > 0) {
        clearButton.style.display = 'block';
    } else {
        clearButton.style.display = 'none';
    }
});

// Function to clear the search input
function clearSearch() {
    const searchInput = document.getElementById('search');
    searchInput.value = '';
    searchInput.focus();
    document.getElementById('clear-search').style.display = 'none';
    filterApplicants();
}

