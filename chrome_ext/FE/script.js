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
            { id: 1243, value: 'Support Sage Suggestion (High)', score: 0.6, threads, tickets},
            { id: 2341, value: 'Support Sage Suggestion (Medium)', score: 0.3, threads, tickets },
            { id: 3213, value: 'Support Sage Suggestion (Low)', score: 0.1, threads, tickets},
          
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

        if (score > 0.4) {
            btn.classList.add('green');
        } else if (score > 0.3 && score <= 0.4) {
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

function summarizeQuery(){
    const queryDiv = document.getElementById('editable-message');
    const query = queryDiv.value;

    if(query !==undefined && query.length >0 ){
    const url = 'http://0.0.0.0:7007/summarise';
    const data = {'input_text': query}

    postData(url, data).then((data) => {
        queryDiv.value = data.result;
      });
    }
}

function summarizeResponse(){
    const responseDiv = document.getElementById('message-input');
    const response = responseDiv.value;

    if(response !==undefined && response.length >0 ){
    const url = 'http://0.0.0.0:7007/summarise';
    const data = {'input_text': response}
    
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

    if(currentDescription !==undefined && currentDescription.length >0 ){
        const url = 'http://0.0.0.0:7007/summarise';
        const data = {'input_text': currentDescription}
        
        postData(url, data).then((data) => {
            ticketDescriptionInput.value = data.result;
          });
        }
}


function summarizeTicketResolution() {
    const ticketDescriptionInput = document.getElementById('resolution');
    const currentDescription = ticketDescriptionInput.value;

    if(currentDescription !==undefined && currentDescription.length >0 ){
        const url = 'http://0.0.0.0:7007/summarise';
        const data = {'input_text': currentDescription}
        
        postData(url, data).then((data) => {
            ticketDescriptionInput.value = data.result;
          });
        }
}

// manage show/hide tabs - start
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
    var selectedTab = document.querySelector('.tab.' + tabName.toLowerCase()); // Corrected here
    if (selectedTab) {
        selectedTab.classList.add('active-tab');
    }
    fetch( tabName + '.html')
        .then(response => response.text())
        .then(content => {
            document.getElementById(tabName).innerHTML = content;
        })
        .catch(error => console.error('Error fetching content:', error));
}
openTab('clientQuery'); // open first tab by default

const tablink = document.querySelectorAll('.tab');
tablink.forEach(element => {
    element.addEventListener('click', function handleClick(event) {
        openTab(element.getAttribute('name'));
    });
});
// manage show/hide tabs - end here
