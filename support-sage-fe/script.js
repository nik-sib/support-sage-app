function submitQuery() {
    const query = document.getElementById('editable-message').value;
    if(query !==undefined && query.length >0 ){
    document.getElementById('client-query-input').style.display = 'none';
    var messageDiv = document.getElementById('message-box');
    messageDiv.classList.add('message-box', 'message-left');
    messageDiv.style.display = 'block';
    messageDiv.textContent = query;


    let threads = [
        { name: 'Thread 1', link: 'http://www.ticketDesk.com/thread1' },
        { name: 'Thread 2', link: 'http://www.ticketDesk.com/thread2' },
        { name: 'Thread 3', link: 'http://www.ticketDesk.com/thread3' }
    ];

    let tickets = [
        { name: 'ticket 1', link: 'http://www.ticketDesk.com/ticket1' },
        { name: 'ticket 2', link: 'http://www.ticketDesk.com/ticket2' },
        { name: 'ticket 3', link: 'http://www.ticketDesk.com/ticket3' }
    ];

    const apiResponse = {
        suggestions: [
            { id: 1243, value: 'Support Sage Suggestion (High)', score: 0.9, threads, tickets},
            { id: 2341, value: 'Support Sage Suggestion (Medium)', score: 0.6, threads, tickets },
            { id: 3213, value: 'Support Sage Suggestion (Low)', score: 0.3, threads, tickets}
        ]
    };
    displaySuggestions(apiResponse.suggestions);
}
else{
    console.log('No Text in Query')
}
}

function displaySuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('suggestions-container');
    suggestionsContainer.innerHTML = '';
    let responseText = '';

    suggestions.forEach((suggestion, index) => {
        let {value, score, threads, tickets} = suggestion;
        const btn = document.createElement('button');
        btn.classList.add('suggestion-btn');

        if (score > 0.6) {
            btn.classList.add('green');
        } else if (score > 0.3 && score <= 0.6) {
            btn.classList.add('orange');
        } else {
            btn.classList.add('red');
        }

        btn.textContent = value;
        btn.addEventListener('click', () => {
            let messageInput = document.getElementById('message-input');
            messageInput.value = value;
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

function displayThreadsAndTickets(threads, tickets){
    // Threads
    if (threads !== null && threads !== undefined) {
        const threadsContainer = document.getElementById('threads-container');
        threadsContainer.innerHTML = '';

        threads.forEach(thread => {
            const threadBox = document.createElement('div');
            threadBox.classList.add('thread-box');
            threadBox.textContent = thread.link;
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

function summarize(text){

}
