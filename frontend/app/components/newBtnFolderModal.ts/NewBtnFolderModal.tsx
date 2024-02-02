import { useEffect } from "react";

const NewBtnFolderModal = () => {
  useEffect(() => {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal');
      // var instances = M.Modal.init(elems, {});
      if (elems) {
        M.Dropdown.init(elems, { coverTrigger: false });
      }
    });

  }, []);

  return (
    <div id="modal1" className="modal">
      <div className="modal-content">
      <form className="col s12">
        <div className="row">
        <div className="input-field col s6">
          <input placeholder="Placeholder" id="first_name" type="text" className="validate" />
          <label htmlFor="first_name">First Name</label>
        </div>
        <div className="input-field col s6">
          <input id="last_name" type="text" className="validate" />
          <label htmlFor="last_name">Last Name</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input disabled value="I am not editable" id="disabled" type="text" className="validate" />
          <label htmlFor="disabled">Disabled</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input id="password" type="password" className="validate" />
          <label htmlFor="password">Password</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input id="email" type="email" className="validate" />
          <label htmlFor="email">Email</label>
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          This is an inline input field:
          <div className="input-field inline">
            <input id="email_inline" type="email" className="validate" />
            <label htmlFor="email_inline">Email</label>
            <span className="helper-text" data-error="wrong" data-success="right">Helper text</span>
          </div>
        </div>
        </div>
        </form>
      </div>
      {/* <div className="modal-footer">
        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
      </div> */}
    </div>
  );
}

export default NewBtnFolderModal;