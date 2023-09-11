
import { Outlet, Link, useLoaderData, Form, redirect, NavLink, useNavigation } from "react-router-dom";
import { getContacts, createContact } from "../contacts";

import React, { useMemo } from 'react';



export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
  // return { contact };
}


// khoi tao gia tri luu giu contex name ban dau
// noi luu tru ngoai root khoi tao
export const Context = React.createContext(null);


export default function Root() {
  const { contacts } = useLoaderData();


  // khai bao useMemo
  const contextValue = useMemo(
    () => ({
      name: 'Ant Design',
      file: 'zip, rar, 7z'
    }),
    [],
  );


  // kiêm tra xem đã điều hướng loading được dữ liệu lên hết chưa
  const navigation = useNavigation();


  console.log('contacts', contacts);
  return (
    <Context.Provider value={contextValue}>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>
        <div className="data-res">
          <h4 style={{ color: 'blue' }}>
            <NavLink to={`data`}>
              click me send data
            </NavLink>
          </h4>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                          ? "pending"
                          : ""
                    }
                  >
                    {/* other code */}

                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail" className={
        navigation.state === "loading" ? "loading" : ""
      }>
        <Outlet />
      </div>
    </Context.Provider>
  );
}

