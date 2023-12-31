function submitQuery() {
    const query = document.getElementById('editable-message').value;
    if (query !== undefined && query.length > 0) {
        document.getElementById('client-query-input').style.display = 'none';
        let messageDiv = document.getElementById('message-box');
        messageDiv.classList.add('message-box', 'message-left');
        messageDiv.style.display = 'block';
        messageDiv.textContent = query;

        const url = 'http://0.0.0.0:7007/suggest';
        const data = { 'input_text': query }

        postData(url, data).then((data) => {
            displaySuggestions(data.suggestions);
        });
    }
    else {
        console.log('No Text in Query')
    }
}

function displaySuggestions(suggestions) {
    let SuggestionSet = new Set();
    const suggestionsContainer = document.getElementById('suggestions-container');
    suggestionsContainer.innerHTML = '';
    let responseText = '';
    suggestions.forEach((suggestion) => {
        let { resolution, score, threads, tickets } = suggestion;
        if (!SuggestionSet.has(resolution)) {
            SuggestionSet.add(resolution)
            const btn = document.createElement('button');
            btn.classList.add('suggestion-btn');
            if (score > 50) {
                btn.classList.add('green');
            } else if (score > 30 && score <= 50) {
                btn.classList.add('orange');
            } else {
                btn.classList.add('red');
            }
            btn.textContent = resolution;
            btn.addEventListener('click', () => {
                let messageInput = document.getElementById('message-input');
                messageInput.value = resolution;
                displayThreadsAndTickets(threads, tickets);
            });
            suggestionsContainer.appendChild(btn);
        }
    });
    return responseText;
}

function displaySuggestionMsgHelper() {
    let responseText = document.getElementById('message-input').value;
    onSuggestionSubmit(responseText);
}

function onSuggestionSubmit(text) {
    if (text !== undefined && text.length > 0) {
        let parent = document.getElementById('chat-messages');
        let newDiv = document.createElement('div');
        newDiv.classList.add('message-box', 'message-right');

        let newParaTag = document.createElement('p');

        newParaTag.textContent = text;

        newDiv.appendChild(newParaTag);
        parent.appendChild(newDiv);

        const message = document.getElementById('message-input');
        if(message){
            message.value = ''
        }
    }
}

function displayThreadsAndTickets(threads, tickets) {
    // Threads
    if (threads !== null && threads !== undefined) {
        const threadsContainer = document.getElementById('threads-container');
        threadsContainer.innerHTML = '';

        threads.forEach(thread => {
            const threadBox = document.createElement('div');
            threadBox.classList.add('thread-box');
            const threadLink = document.createElement('a');
            threadLink.href = thread;
            threadLink.target = '_blank';
            threadLink.textContent = thread;
            threadBox.appendChild(threadLink);
            threadsContainer.appendChild(threadBox);
        })
    }

    // Tickets
    if (tickets !== null && tickets !== undefined) {
        const ticketsContainer = document.getElementById('tickets-container');
        ticketsContainer.innerHTML = '';

        tickets.forEach(ticket => {
            const ticketBox = document.createElement('div');
            ticketBox.classList.add('ticket-box');
            const ticketLink = document.createElement('a');
            ticketLink.href = ticket;
            ticketLink.target = '_blank';
            ticketLink.textContent = ticket
            ticketBox.appendChild(ticketLink);
            ticketsContainer.appendChild(ticketBox);
        })
    }
}

function summarizeQuery() {
    const queryDiv = document.getElementById('editable-message');
    const query = queryDiv.value;

    if (query !== undefined && query.length > 0) {
        const url = 'http://0.0.0.0:7007/summarise';
        const data = { 'input_text': query }

        postData(url, data).then((data) => {
            queryDiv.value = data.result;
        });
    }
}

function summarizeResponse() {
    const responseDiv = document.getElementById('message-input');
    const response = responseDiv.value;

    if (response !== undefined && response.length > 0) {
        const url = 'http://0.0.0.0:7007/summarise';
        const data = { 'input_text': response }

        postData(url, data).then((data) => {
            responseDiv.value = data.result;
        });
    }
}


async function postData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });
    return response.json();
}
async function postDataString(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });
    return response;
}
function summarizeTicketDescription() {
    const ticketDescriptionInput = document.getElementById('ticketDescription');
    const currentDescription = ticketDescriptionInput.value;

    if (currentDescription !== undefined && currentDescription.length > 0) {
        const url = 'http://0.0.0.0:7007/summarise';
        const data = { 'input_text': currentDescription }

        postData(url, data).then((data) => {
            ticketDescriptionInput.value = data.result;
        });
    }
}


function summarizeTicketResolution() {
    const ticketDescriptionInput = document.getElementById('resolution');
    const currentDescription = ticketDescriptionInput.value;

    if (currentDescription !== undefined && currentDescription.length > 0) {
        const url = 'http://0.0.0.0:7007/summarise';
        const data = { 'input_text': currentDescription }

        postData(url, data).then((data) => {
            ticketDescriptionInput.value = data.result;
        });
    }
}
function openTab(tabName) {
    var tabContents = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = 'none';
    }
    var tabs = document.getElementsByClassName('tab');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active-tab');
    }
    document.getElementById(tabName).style.display = 'block';
    var selectedTab = document.querySelector('.tab[name="' + tabName + '"]');
    if (selectedTab) {
        selectedTab.classList.add('active-tab');
    }
    fetch(tabName + '.html')
        .then(response => response.text())
        .then(content => {
            document.getElementById(tabName).innerHTML = content;
            setContextSelectedTextInClientQueryField();
        })
        .catch(error => console.error('Error fetching content:', error));
}

openTab('clientQuery');

function addCategory(event){
    event.preventDefault();
    if (!validateInputs()) {
        return;
    }
    const ticketDescription = document.getElementById('ticketDescription').value;
    const resolution = document.getElementById('resolution').value;
    const ticketType = document.getElementById('ticketType').value;
    const relevantThreads = document.getElementById('ticketThreads').value;
    const relevantTickets = document.getElementById('relevantTickets').value;
    const rating = document.querySelector('input[name="customerSatisfactionRating"]:checked');
    const ratingValue = rating ? rating.value : null;
    const ticketChannel = document.getElementById('ticketChannel');
    const ticketChannelValue = ticketChannel ? ticketChannel.value : null;

    const url = 'http://0.0.0.0:7007/add-data';
    const data = {
        "description":ticketDescription,
        "resolution": resolution,
        "type": ticketType,
        "relevant_threads": relevantThreads,
        "relevant_tickets": relevantTickets,
        "customer_satisfication_rating": ratingValue,
        "channel": ticketChannelValue
    }
    postDataString(url, data).then((data) => {
        window.alert('Submitted Data Successfully');
    });
    clearInputFields();

}
function validateInputs() {
    let invalidFields = [];

    const ticketDescription = document.getElementById('ticketDescription').value.trim();
    if (ticketDescription === '') {
        invalidFields.push('Ticket Description');
    }

    const resolution = document.getElementById('resolution').value.trim();
    if (resolution === '') {
        invalidFields.push('Resolution');
    }

    const ticketType = document.getElementById('ticketType').value;
    if (ticketType === '') {
        invalidFields.push('Ticket Type');
    }

    const ratingInputs = document.querySelectorAll('input[name="customerSatisfactionRating"]:checked');
    if (ratingInputs.length === 0) {
        invalidFields.push('Customer Satisfaction Rating');
    }


    const ticketChannel = document.getElementById('ticketChannel').value;
    if (ticketChannel === '') {
        invalidFields.push('Ticket Channel');
    }
    if (invalidFields.length > 0) {
        const errorMessage = `Please fill in the following fields: ${invalidFields.join(', ')}`;
        window.alert(errorMessage);
        return false;
    }
    return true;
}

function clearInputFields() {
    const ticketDescription = document.getElementById('ticketDescription');
    if (ticketDescription) {
        ticketDescription.value = '';
    }    const resolution = document.getElementById('resolution');
    if (resolution) {
        resolution.value = '';
    }
    const ticketType = document.getElementById('ticketType');
    if (ticketType) {
        ticketType.value = '';
    }
    const ratingInputs = document.querySelectorAll('input[name="customerSatisfactionRating"]');
    ratingInputs.forEach(input => {
        input.checked = false;
    });
    const ticketThreads = document.getElementById('ticketThreads');
    if (ticketThreads) {
        ticketThreads.value = '';
    }
    const relevantTickets = document.getElementById('relevantTickets');
    if (relevantTickets) {
        relevantTickets.value = '';
    }
    const ticketChannel = document.getElementById('ticketChannel');
    if (ticketChannel) {
        ticketChannel.value = 'Select';
    }
}

const tablink = document.querySelectorAll('.tab');
tablink.forEach(element => {
    element.addEventListener('click', function handleClick(event) {
        openTab(element.getAttribute('name'));
    });
});

document.addEventListener( "click", buttonClickListener );

function buttonClickListener(event){
    let element = event.target;

    switch (element.id) {
        case 'summarize-btn-query':
            summarizeQuery();
            break;
        case 'client-query-btn':
            submitQuery();
            break;
        case 'summarize-btn-response':
            summarizeResponse();
            break;
        case 'submit-btn':
            displaySuggestionMsgHelper();
            break;
        case 'ticket-desc-summ-btn':
            summarizeTicketDescription();
            break;
        case 'resolution-summ-btn':
            summarizeTicketResolution();
            break;
        case 'submit-category-btn':
            addCategory(event);
            break;
    
    }
}

function setContextSelectedTextInClientQueryField() {
    chrome.storage.sync.get(['ss_query'], function(items) {
        if (items.ss_query !== undefined) {    
            document.getElementById('editable-message').value = items.ss_query;
    
            chrome.storage.sync.remove(['ss_query'], function(items) {
            });
        }
    });
}