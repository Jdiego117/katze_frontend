import React, { Component } from 'react';
import './index.css';

class Modals extends Component {
  render() {
    return (
      <div>
<div class="modal fade" id="log_verify" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="check">
          <div><i class="fas fa-check-circle"></i></div>
           <p>Para iniciar sesion primero debes verificar tu cuenta, enviamos un codigo de verificacion para confirmar tu correo.</p>
        </div>
        <div class="input_code">
          <input type="text" name="" placeholder="xxxxxxx" />
        </div>
        <div class="resend_code">
          <b>Volver a enviar</b>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success">Verificar</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</div>
    );
  }
}

export default Modals;