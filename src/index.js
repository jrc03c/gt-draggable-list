const { createApp } = require("vue")
const Sortable = require("sortablejs")

$(window).on("startGTDraggableList", (event, data) => {
  const container = document.querySelector("#gt-draggable-list")
  const { items, returnLabel } = data

  const app = createApp({
    template: /* html */ `
      <div>
        <ul ref="list" class="button-group answers question_multiple_choice">
          <li v-for="item in items" class="answer">
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

    mounted() {
      const self = this

      const sortable = Sortable.create(self.$refs.list, {
        animation: 150,
        // handle: "glyphicon glyphicon-move",
        ghostClass: "ghost",
      })
    },
  })

  app.mount(container)
})
