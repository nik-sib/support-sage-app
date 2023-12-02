function submitQuery() {
    const query = document.getElementById('editable-message').value;
    if (query !== undefined && query.length > 0) {
        document.getElementById('client-query-input').style.display = 'none';
        let messageDiv = document.getElementById('message-box');
        messageDiv.classList.add('message-box', 'message-left');
        messageDiv.style.display = 'block';
        messageDiv.textContent = query;

        // const url = 'http://0.0.0.0:7007/suggest';
        // const data = { 'input_text': response }
        
        // postData(url, data).then((apiResponse) => {
        //     displaySuggestions(apiResponse.suggestions);
        // });

        let threads = [
            'http://www.ticketDesk.com/thread1',
            'http://www.ticketDesk.com/thread2',
            'http://www.ticketDesk.com/thread3'
        ];

        let tickets = [
            'http://www.ticketDesk.com/ticket1',
            'http://www.ticketDesk.com/ticket2',
            'http://www.ticketDesk.com/ticket3'
        ];

        const apiResponse = {
            suggestions: [
                { resolution: 'Support Sage Suggestion (High)', score: 0.6, threads, tickets },
                { resolution: 'Support Sage Suggestion (Medium)', score: 0.3, threads, tickets },
                { resolution: 'Support Sage Suggestion (Low)', score: 0.1, threads, tickets },

            ]
        };
        displaySuggestions(apiResponse.suggestions);
    }
    else {
        console.log('No Text in Query')
    }
}

function displaySuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('suggestions-container');
    suggestionsContainer.innerHTML = '';
    let responseText = '';

    suggestions.forEach((suggestion, index) => {
        let { resolution, score, threads, tickets } = suggestion;
        const btn = document.createElement('button');
        btn.classList.add('suggestion-btn');

        if (score > 0.4) {
            btn.classList.add('green');
        } else if (score > 0.3 && score <= 0.4) {
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
            threadBox.textContent = thread;
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
            ticketBox.textContent = ticket.link;
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
    console.log('postAPICall', data);
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

