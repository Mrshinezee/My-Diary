const token = localStorage.getItem('authToken');
if (!token) {
  window.location.href = 'https://my-diary-collins.herokuapp.com/index.html';
}

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
};
const allEntriesUrl = 'https://my-diary-collins.herokuapp.com/api/v1/entries/';

fetch(allEntriesUrl, options)
  .then(response => response.json())
  .then((data) => {
    const { message, entry } = data;
    const entryMessage = document.getElementById('allMessage');
    entryMessage.innerHTML = message;

    const table = document.getElementById('entriesTable');
    for (let index = 0; index < entry.length; index += 1) {
      const row = table.insertRow(index + 1);
      const cell1 = row.insertCell(0);
      cell1.setAttribute('name', 'Date');
      const cell2 = row.insertCell(1);
      cell2.setAttribute('name', 'Title');
      const cell3 = row.insertCell(2);
      cell3.setAttribute('name', 'Action');
      const date = new Date(entry[index].entrydate);
      cell1.innerHTML = date.toLocaleDateString('en-US', options);
      cell2.innerHTML = entry[index].entrytitle;
      cell3.innerHTML = `<div class="view" onclick="getEntries.viewTableEntry(${entry[index].entryid});"></div>
                          <div class="delete" onclick="getEntries.deleteTableEntry(${entry[index].entryid});"></div>
                          `;
    }
  });


const modalHeaderHtml = '<div class="logo_sub" >DELETE</div>';
const modalContentHtml = '<p style="text-align: center;"> Entry will be removed permanetly</p>';
const viewModal = document.getElementById('view-modal');
const closeViewModal = () => {
  viewModal.style.display = 'none';
  viewModal.innerHTML = '';
};
const deleteModal = (id) => {
  const deleteOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };

  fetch(allEntriesUrl + id, deleteOptions)
    .then(response => response.json())
    .then((data) => {
      if (data.success === false) {
      } else {
        closeViewModal();
        window.location.href = 'https://my-diary-collins.herokuapp.com/allEntry.html';
      }
    });
};

const modalbuilder = (id) => {
  const modalBody = document.createElement('div');
  modalBody.className = 'modalBody';
  const modalHeader = document.createElement('div');
  modalHeader.className = 'modalHeader';
  const modalContent = document.createElement('div');
  modalContent.className = 'modalContent';
  const modalfooter = document.createElement('div');
  modalfooter.className = 'modalfooter';
  modalHeader.innerHTML = modalHeaderHtml;
  modalContent.innerHTML = modalContentHtml;
  const modalFooterHtml = `<div class='btn-div'><button class='btn btn-back' onclick='deleteModal(${id});'><i class='fa fa-pencil-square-o'></i> OK</button><button class='btn closeUpdate' id='btn-close' onclick='closeViewModal();'><i class='fa fa-close'></i> Cancel</button></div><br>`;
  modalfooter.innerHTML = modalFooterHtml;
  modalBody.appendChild(modalHeader);
  modalBody.appendChild(modalContent);
  modalBody.appendChild(modalfooter);
  viewModal.appendChild(modalBody);
  viewModal.style.display = 'block';
  window.addEventListener('click', (event) => {
    if (event.target === viewModal) {
      closeViewModal();
    }
  });
};

const getEntries = {
  editTableEntry: () => {
    updateModal();
  },
  viewTableEntry: (id) => {
    fetch(allEntriesUrl + id, options)
      .then(response => response.json())
      .then((json) => {
        const { message, entry } = json;
        updateModal(entry[0], message);
      });
  },
  deleteTableEntry: (id) => {
    modalbuilder(id);
  },
};

const editModal = document.getElementById('edit-modal');
const closeUpdateModal = () => {
  editModal.style.display = 'none';
  editModal.innerHTML = '';
};
const updatebody = document.createElement('div');
const updateDiv = document.createElement('div');
const headerDiv = document.createElement('div');
const titleDiv = document.createElement('div');
const entryDiv = document.createElement('div');
const submitDiv = document.createElement('div');
const closeDownUpdate = document.createElement('button');
const submitUpdateBtn = document.createElement('button');
const form = document.createElement('form');
updatebody.className = 'editBody';
updateDiv.className = 'editDiary';
headerDiv.textContent = 'Entry';
headerDiv.className = 'logo_sub';
titleDiv.className = 'form';
entryDiv.className = 'form';
submitDiv.className = 'centre-div';
let diaryTitle = '';
let diaryEntry = '';
let diaryId = '';
const updateModal = (diary, message) => {
  diaryId = diary.entryid;
  submitUpdateBtn.textContent = 'Update';
  submitUpdateBtn.className = 'btn-back';
  closeDownUpdate.textContent = 'Close';
  closeDownUpdate.className = 'closeUpdate';
  titleDiv.innerHTML = `<label for="title">Entry Title</label><input type="text" name="entryTitle" id="diaryTitle" value="${diary.entrytitle}" >`;
  entryDiv.innerHTML = `<label for="entry">Diary Entry</label><textarea name="entry" id="diaryEntry" rows="5" cols="50" required>${diary.entrycontent}</textarea>`;
  form.appendChild(titleDiv);
  form.appendChild(entryDiv);
  submitDiv.appendChild(closeDownUpdate);
  submitDiv.appendChild(submitUpdateBtn);
  updateDiv.appendChild(headerDiv);
  updateDiv.appendChild(form);
  updateDiv.appendChild(submitDiv);
  updatebody.appendChild(updateDiv);
  editModal.appendChild(updatebody);
  editModal.style.display = 'block';
  diaryTitle = document.getElementById('diaryTitle');
  diaryEntry = document.getElementById('diaryEntry');
  window.addEventListener('click', (event) => {
    if (event.target === editModal) {
      closeUpdateModal();
    }
  });
};

closeDownUpdate.addEventListener('click', () => {
  closeUpdateModal();
});

submitUpdateBtn.addEventListener('click', () => {
  const editEntryBody = {
    entrytitle: diaryTitle.value,
    entrycontent: diaryEntry.value,
  };
  const editOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(editEntryBody),
  };
  fetch(allEntriesUrl + diaryId, editOptions)
    .then(response => response.json())
    .then((data) => {
      if (data.success === false) {
      } else {
        editModal.style.display = 'none';
        editModal.innerHTML = '';
      }
    });
});
