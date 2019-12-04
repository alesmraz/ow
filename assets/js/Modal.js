import $ from 'jquery'

export default class Modal {
  constructor() {}

  init() {
    $('#productModal').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget) // Button that triggered the modal
      var id = button.data('id') // Extract info from data-* attributes
      var title = button.closest('.productCard__content').find('.title').text()

      var modal = $(this)
      modal.find('.modal-title').text('Produkt: ' + title)
      modal.find('.modal-body input[name="id"]').val(id)
    })
  }
}