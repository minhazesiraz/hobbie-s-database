/* VERSION HISTORY-1504@10

@01ul: COMMAND - TERMINAL.
1. npm install @types/react --save-dev

@02ul - KEYBOARD SHORTCUTS.
1. "key": "ctrl+k ctrl+j",
   "command": "editor.unfoldAll",
   "when": "editorTextFocus && foldingEnabled"
2. "key": "ctrl+b",
   "command": "workbench.action.toggleSidebarVisibility"
3. "key": "ctrl+j",
   "command": "workbench.action.togglePanel"

@03ul: EXTENSIONS - CATALOG.
1. ChatGPT - EasyCode : EasyCode AI   @enable
2. Code Spell Checker : Street Side Software @enable
3. ESLint : Microsoft   @enable
4. Learn with Sumit Theme : Learn with Sumit @enable
5. npm Intellisense : Christian Kohler @enable
6. Path Intellisense : Christian Kohler   @enable
7. Postman : Postman @enable
8. Tailwind CSS Intellisense : Tailwind Labs @enable
9. Symbols of VSCode : Minhaz E Siraz  @enable
10. GitLens - Git Superchanged : GitKraken   @enable
13. Ayu : teabyii
14. Monokai Pro : monokai
15. Material Icon Theme : Philipp Kief

@04ul: ACCOUNTS - SIGN IN TO SYNC SETTINGS.
default 1. minhazesiraz@gmail.com (www.github.com)
   Settings Sync: Configure... @enable
      6. Extensions
2. minhazesiraz@hotmail.com (MICROSOFT)
   Settings Sync: Configure... @enable
      1. Settings
      2. Keyboard Shortcuts
      3. User Snippets
      4. User Tasks
      5. UI State
      6. Extensions
      7. Profiles

@05ul: CUSTOMIZATIONS - USER INTERFACE.

Installation's : Create a new file named "workbench.desktop.main.css"... in the root directory, then paste the following code into this file. If any other customizations are needed, start by opening the command palette in VS Code. You can do this by navigating to the View - Command palette... ("key": "ctrl+shift+p") - In the search bar within the command palette, type "developer:toggle developer tools" and get the name of your desired "Cascading Style Sheets" class to set your style.

.monaco-icon-label>.monaco-icon-label-container>.monaco-icon-name-container>.label-name {
   font-family: "JetBrains Mono", monospace !important;
}

@06ul: OPEN FILES - (NAME OF FILES) BY COMMAND PROMPT.

@echo off
start cmd /k "cd /d <pathname> && code . && npm run dev"
start cmd /k "cd /d <pathname> && code . && nodemon index.js"

@07ul: .eslintrc.cjs

   rules: {
      "react/prop-types": "off"
      ],
   }

@08ul:
   1. CascadingStyleSheets.json
   2. extensions.json   @empty
   3. keybindings.json  @empty
   4. launch.json @empty
   5. settings.json
   6. Comments.js
   7. global.code-snippets
   8. workbench.desktop.main.css [Optional]

@09ul: [https://expressjs.com/en/starter/installing.html]
   mkdir myapp
   cd myapp
   npm init -y
   npm install express cors dotenv mongodb
*/