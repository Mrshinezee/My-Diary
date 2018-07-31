const diary = [
  {
    id: 1,
    date: '24-06-2018',
    Title: 'The two solider sons',
    entry: 'The eldest son in a family of three boys, Aricles had no desire to be a soldier',
  },
  {
    id: 2,
    date: '25-06-2018',
    Title: 'Falling in love',
    entry: 'Everything happened with millsecond, beautiful girl passsing by with alovely smile',
  },
];

const table = document.getElementById('entriesTable');
for (let index = 0; index < diary.length; index += 1) {
  const row = table.insertRow(index + 1);

  const cell1 = row.insertCell(0);
  cell1.setAttribute('name', 'Date');
  const cell2 = row.insertCell(1);
  cell2.setAttribute('name', 'Title');
  const cell3 = row.insertCell(2);
  cell3.setAttribute('name', 'Action');

  cell1.innerHTML = diary[index].date;
  cell2.innerHTML = diary[index].Title;
  cell3.innerHTML = `<div class="view" onclick="getEntries.viewTableEntry(${diary[index].id});"></div>
                         <div class="edit" onclick="getEntries.editTableEntry(${diary[index].id});"></div>
                         <div class="delete" onclick="getEntries.deleteTableEntry(${diary[index].id});"></div>
                        `;
}


const modalHeaderHtml = '<div class="logo_sub" >DELETE</div>';
const modalContentHtml = '<p style="text-align: center;"> Entry will be removed permanetly</p>';
const modalFooterHtml = '<div class="btn-div"><button class="btn btn-back" onclick="updateModal();"><i class="fa fa-pencil-square-o"></i> OK</button><button class="btn closeUpdate" id="btn-close" onclick="closeViewModal();"><i class="fa fa-close"></i> Cancel</button></div><br>';

const viewModal = document.getElementById('view-modal');
const closeViewModal = () => {
  viewModal.style.display = 'none';
  viewModal.innerHTML = '';
};

const modalbuilder = () => {
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
  createTableEntry: () => {
    // window.location.href = 'entry.html';
  },
  editTableEntry: () => {
    updateModal();
  },
  viewTableEntry: () => {
    updateModal();
  },
  deleteTableEntry: () => {
    modalbuilder();
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
headerDiv.textContent = 'Edit Entry';
headerDiv.className = 'logo_sub';
titleDiv.className = 'form';
entryDiv.className = 'form';
submitDiv.className = 'centre-div';

const updateModal = () => {
  submitUpdateBtn.textContent = 'Update';
  submitUpdateBtn.className = 'btn-back';
  closeDownUpdate.textContent = 'Close';
  closeDownUpdate.className = 'closeUpdate';
  titleDiv.innerHTML = `<label for="title">Entry Title</label><input type="text" name="entryTitle" id="diaryTitle" value="${diary[1].Title}" >`;
  entryDiv.innerHTML = `<label for="entry">Diary Entry</label><textarea name="entry" id="diaryEntry" rows="5" cols="50" required>${diary[1].entry}</textarea>`;
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
  window.addEventListener('click', (event) => {
    if (event.target === editModal) {
      closeUpdateModal();
    }
  });
};

const diaryTitle = document.getElementById('diaryTitle');
const diaryEntry = document.getElementById('diaryEntry');
closeDownUpdate.addEventListener('click', () => {
  closeUpdateModal();
});
submitUpdateBtn.addEventListener('click', () => {
  const requestBody = {
    title: diaryTitle.value,
    entry: diaryEntry.value,
  };
});
