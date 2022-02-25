const { createApp } = require("vue")

$(window).on("startGTDraggableList", (event, data) => {
  const container = document.querySelector("#gt-draggable-list")
  const { items, returnLabel } = data

  const app = createApp({
    template: /* html */ `
      <div>
        <ul>
          <li v-for="item in items">
            {{ item }}
          </li>
        </ul>

        <button class="btn btn-large btn-default btn-block" @click="goToNext">
          Next
        </button>
      </div>
    `,

    data() {
      return {
        items,
      }
    },

    methods: {
      goToNext() {
        const sortedItems = items
        $(window).trigger("endDraggableList", { sortedItems, returnLabel })
      },
    },
  })

  app.mount(container)
})
