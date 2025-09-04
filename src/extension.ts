import * as vscode from 'vscode';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('krishna-chatbot.askCode', async () => {
    const prompt = await vscode.window.showInputBox({
      prompt: '💬 What code do you want to generate?',
      placeHolder: 'e.g., Create a Python Flask app with /hello endpoint',
      ignoreFocusOut: true
    });

    if (!prompt) {
      return;
    }

    const outputChannel = vscode.window.createOutputChannel('Code Chat');
    outputChannel.show(true);
    outputChannel.appendLine(`🧠 Prompt: ${prompt}\n`);

    try {
      const res = await axios.post('http://localhost:11434/api/generate', {
        model: 'codellama',
        prompt: prompt,
        stream: false
      });

      const result = res.data.response || '[No response]';

      outputChannel.appendLine(result);

      const editor = vscode.window.activeTextEditor;
      if (editor) {
        editor.edit(editBuilder => {
          editBuilder.insert(editor.selection.active, `\n${result}\n`);
        });
      }
    } catch (error: any) {
      outputChannel.appendLine(`❌ Error: ${error.message}`);
      vscode.window.showErrorMessage("Failed to get response from model.");
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
