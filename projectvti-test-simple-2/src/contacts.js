import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getContacts(query) {

  // tao ra một kết nối giả đến server để lấy dữ liệu
  await fakeNetwork(`getContacts:${query}`);
  // tao ra một danh sách localforage và lưu ở dưới indexdb
  let contacts = await localforage.getItem("contacts");
  // kiêm tra xem nếu mảng contatcs có dữ liệu chưa nếu chưa có thì trả về mảng rỗng
  if (!contacts) contacts = [];
// biến query kiêm tra xem người dùng có tìm kiếm với từ khoá với điều kiện tìm thoả
// mãn một trong hai là last và first
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  // trả về một danh sach đã được xắp xếp theo last và ngày khởi tạo
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
  // fake 1 network mất một khoảng thời gian nào đó
  await fakeNetwork();
  // tạo ra một cái id duy nhất
  let id = Math.random().toString(36).substring(2, 9);
  // tạo ra một object contact với id và createAt vừa sinh ra
  let contact = { id, createdAt: Date.now() };
  // lấy ra môt danh sách mảng contatcs 
  let contacts = await getContacts();
  // thêm object contact vừa tạo vào mảng đã get ra vào đầu.
  contacts.unshift(contact);
  // set lại contatcs đã được cập nhập
  await set(contacts);
  return contact;
}

export async function getContact(id) {
  await fakeNetwork(`contact:${id}`);
  let contacts = await localforage.getItem("contacts");
  let contact = contacts?.find(contact => contact.id === id);
  return contact ?? null;
}

export async function updateContact(id, updates) {
  await fakeNetwork();
  // lấy ra một danh sách contacts
  let contacts = await localforage.getItem("contacts");
  // tìm object contatc với id tương ứng trong list contact bên trên
  let contact = contacts.find(contact => contact.id === id);
  // nếu chưa có thì in ra lỗi
  if (!contact) throw new Error("No contact found for", id);
  // nếu tìm được thì gán contact tìm được bằng cái object updates mà mình mình thêm vào form khi nãy
  Object.assign(contact, updates);
  // thực hiện set lại giá trị mảng contacs
  await set(contacts);
  return contact;
}

export async function deleteContact(id) {
  let contacts = await localforage.getItem("contacts");
  let index = contacts.findIndex(contact => contact.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;
}

function set(contacts) {
  return localforage.setItem("contacts", contacts);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}