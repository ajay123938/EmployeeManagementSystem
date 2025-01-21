let employelist = [];
document.getElementById("formdata").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#exampleInputEmail1").value;
  const position = document.querySelector("#position").value;
  const salary = document.querySelector("#salary").value;

  const emplyoedata = {
    id: employelist.length - 1,
    name: name,
    email: email,
    position: position,
    salary: salary,
  };
  employelist.push(emplyoedata);

  console.log(employelist);
  localStorage.setItem("employee", JSON.stringify(employelist));

  if (employelist.length > 0) {
    document.querySelector(".tabledata").innerHTML += ` <tr>
        <th scope="row">${employelist.length}</th>
        <td>${employelist[employelist.length - 1].name}</td>
        <td>${employelist[employelist.length - 1].email}</td>
        <td>${employelist[employelist.length - 1].position}</td>
         <td>${employelist[employelist.length - 1].salary}</td>
         <td><button type="button" class="btn btn-info" onclick="editemployee(${
           employelist.length - 1
         })">Edit</button>
         <button type="button" class="btn btn-danger" onclick="deleteEmployee(${
           employelist.length - 1
         })">Delete</button>
         </td>
      </tr>`;
  }

  document.querySelector("#name").value = "";
  document.querySelector("#exampleInputEmail1").value = "";
  document.querySelector("#position").value = "";
  document.querySelector("#salary").value = "";
});
let container;

const editemployee = (id) => {
  container = document.createElement("div");
  container.style.height = `${500}px`;
  container.style.width = `${400}px`;
  container.style.background = "white";
  container.style.borderRadius = "5px";
  container.style.top = "40px";
  container.style.left = "400px";
  container.style.border = "1px solid gray";
  container.style.zIndex = "10000";
  container.style.padding = "10px";
  container.style.position = "absolute";
  document.getElementById("formdata").style.zIndex = "0.5";
  container.style.background = "gray";
  document.getElementById("edit").appendChild(container);

  const employeedata = employelist;
  console.log(id);
  console.log(employeedata);

  container.innerHTML = `
    <div class="mb-3">
    <button onclick="if(container) document.getElementById('edit').removeChild(container)">
    X</button>
    </div>


    <div class="mb-3">
        <label for="editname" class="form-label">Name</label>
        <input type="text" class="form-control" id="editname" value="${employeedata[id].name}" aria-describedby="emailHelp">
        </div>



    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input type="email"  class="form-control" id="editemail" value="${employeedata[id].email}" aria-describedby="emailHelp">
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>


    <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Position</label>
        <input type="text" class="form-control" id="editposition" value="${employeedata[id].position}" aria-describedby="emailHelp">
      </div>


      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Salary</label>
        <input type="text" class="form-control" id="editsalary" value="${employeedata[id].salary}" aria-describedby="emailHelp">
      </div>


   
    <button type="submit" class="btn btn-primary" onclick= "addeditdata(${id})">edit</button>
    
    `;
};

const addeditdata = (id) => {
  const name = document.querySelector("#editname").value;
  const email = document.querySelector("#editemail").value;
  const position = document.querySelector("#editposition").value;
  const salary = document.querySelector("#editsalary").value;

  const emplyoedata = {
    name: name,
    email: email,
    position: position,
    salary: salary,
  };
  employelist.splice(id, 1, emplyoedata);
  console.log(employelist);
  document.querySelector(".tabledata").innerHTML = "";

  for (let i = 0; i < employelist.length; i++) {
    document.querySelector(".tabledata").innerHTML += ` <tr>
         <th scope="row">${i + 1}</th>
        <td>${employelist[i].name}</td>
        <td>${employelist[i].email}</td>
        <td>${employelist[i].position}</td>
         <td>${employelist[i].salary}</td>
         <td><button type="button" class="btn btn-info" onclick="editemployee(${i})">Edit</button>
         <button type="button" class="btn btn-danger" onclick="deleteEmployee(${i})">Delete</button></td>

      </tr>`;
  }

  // Remove

  if (container) {
    document.getElementById("edit").removeChild(container);
  }
};

const deleteEmployee = (id) => {
  employelist.splice(id, 1);

  document.querySelector(".tabledata").innerHTML = "";

  for (let i = 0; i < employelist.length; i++) {
    document.querySelector(".tabledata").innerHTML += ` <tr>
       <th scope="row">${i + 1}</th>
      <td>${employelist[i].name}</td>
      <td>${employelist[i].email}</td>
      <td>${employelist[i].position}</td>
       <td>${employelist[i].salary}</td>
       <td><button type="button" class="btn btn-info" onclick="editemployee(${i})">Edit</button>
       <button type="button" class="btn btn-danger" onclick="deleteEmployee(${i})">Delete</button></td>

    </tr>`;
  }
};

const fetchData = async()=>{
 let response = await  fetch("https://678df492a64c82aeb11e7157.mockapi.io/api/employee/jj")


  employelist = await response.json()
  

  
  document.querySelector(".tabledata").innerHTML = "";

  for (let i = 0; i < employelist.length; i++) {
    document.querySelector(".tabledata").innerHTML += ` <tr>
       <th scope="row">${i + 1}</th>
      <td>${employelist[i].name}</td>
      <td>${employelist[i].email}</td>
      <td>${employelist[i].position}</td>
       <td>${employelist[i].salary}</td>
       <td><button type="button" class="btn btn-info" onclick="editemployee(${i})">Edit</button>
       <button type="button" class="btn btn-danger" onclick="deleteEmployee(${i})">Delete</button></td>

    </tr>`;
  }
   
  
}

fetchData()