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
        sortedItems: null,
        sortable: null,
      }
    },

    methods: {
      goToNext() {
        const self = this

        $(window).trigger("endDraggableList", {
          sortedItems: self.sortedItems,
          returnLabel,
        })

        self.$.appContext.app.unmount()
      },
    },

    mounted() {
      const self = this
      self.sortedItems = items.slice()

      self.sortable = Sortable.create(self.$refs.list, {
        animation: 150,
        ghostClass: "ghost",
        // handle: "glyphicon glyphicon-move",

        onUpdate(event) {
          const item = self.sortedItems[event.oldIndex]
          self.sortedItems.splice(event.oldIndex, 1)
          self.sortedItems.splice(event.newIndex, 0, item)
        },
      })
    },

    beforeUnmount() {
      const self = this
      self.sortable.destroy()
    },
  })

  app.mount(container)
})
