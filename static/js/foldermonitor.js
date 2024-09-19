document.addEventListener('DOMContentLoaded', (event) => {
    hljs.highlightAll();

    const demoNavItems = document.querySelectorAll('.demo-nav-item');
    const demoVideo = document.getElementById('demo-video');
    const videoSource = demoVideo.querySelector('source'); // Get the <source> tag inside the video
    const codeContainer = document.querySelector('.code-container pre code');

    demoNavItems.forEach(item => {
        item.addEventListener('click', function () {
            demoNavItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');

            const demoType = this.getAttribute('data-demo');
            switch (demoType) {
                case 'folder-change':
                    codeContainer.textContent = `
def add_folder(self):
    folder = QFileDialog.getExistingDirectory(self, "选择监视文件夹")
    if folder and folder not in self.folder_list:
        self.folder_list.append(folder)
        self.folderList.addItem(folder)
        self.start_observer(folder)
        self.save_folders()
        self.log_action(f"Added folder: {folder}")

def remove_folder(self):
    current_item = self.folderList.currentItem()
    if current_item:
        folder = current_item.text()
        self.folder_list.remove(folder)
        self.folderList.takeItem(self.folderList.row(current_item))
        self.stop_observer(folder)
        self.save_folders()
        self.log_action(f"Removed folder: {folder}")
                    `;
                    videoSource.src = 'https://buaaerjys.us.kg/static/video/folder-change.mp4'; // Set video source for folder change demo
                    break;
                case 'folder-detection':
                    codeContainer.textContent = `
class FolderHandler(FileSystemEventHandler):
    def __init__(self, app):
        self.app = app

    def on_created(self, event):
        path, _ = os.path.split(event.src_path)
        self.app.log_change(path, "created")

    def on_deleted(self, event):
        path, _ = os.path.split(event.src_path)
        self.app.log_change(path, "deleted")

    def on_moved(self, event):
        path, _ = os.path.split(event.src_path)
        self.app.log_change(path, "modified")

class FolderScannerApp(QMainWindow):
    def __init__(self):
        super().__init__()
        ......
        self.handler = FolderHandler(self)
        self.setup_watchdog()
        ......
        
    def setup_watchdog(self):
        for folder in self.folder_list:
            self.start_observer(folder)

    def start_observer(self, folder):
        if folder not in self.observers or not self.observers[folder].is_alive():
            observer = Observer()
            observer.schedule(self.handler, folder, recursive=False)
            observer.start()
            self.observers[folder] = observer
                    `;
                    videoSource.src = 'https://buaaerjys.us.kg/static/video/folder-detection.mp4'; // Set video source for folder detection demo
                    break;
                case 'real-time-notification':
                    codeContainer.textContent = `
class NotificationManager(QObject):
    show_message_signal = pyqtSignal(str, str)

    def __init__(self, app, icon):
        super().__init__()
        ......

    def show_notification(self, title, message):
        if self.notification_type == "系统通知1（可能无效）":
            plyer.notification.notify(title=title, message=message, app_icon=self.icon, timeout=1)
        elif self.notification_type == "系统通知2（可能无效）":
            self.winotify.title = title
            self.winotify.msg = message
            self.winotify.icon = self.icon
            self.winotify.show()
            self.winotify.duration = "short"
        elif self.notification_type == "软件通知":
            self.show_message_signal.emit(title, message)  # type: ignore

    def show_notice(self, title, message):
        if not self.notice:
            self.notice = Notice(title, message)
        else:
            self.notice.title.setText(title)
            self.notice.message.setText(message)
        self.notice.show_animation()
        self.timer.start(3000)

    def close_notice(self):
        if self.notice:
            self.notice.hide_animation()
            self.notice = None
        self.timer.stop()
                    `;
                    videoSource.src = 'https://buaaerjys.us.kg/static/video/real-time-notification.mp4'; // Set video source for real-time notification demo
                    break;
                case 'log-generation':
                    codeContainer.textContent = `
def log_action(self, message):
    timestamp = QDateTime.currentDateTime().toString("yyyy-MM-dd hh:mm:ss")
    log_entry = f"{timestamp} - {message}\\n"
    self.logText.append(log_entry)

     # 限制日志条目数量
     max_log_entries = 1000
     current_text = self.logText.toPlainText().split('\\n')
     if len(current_text) > max_log_entries:
         self.logText.setPlainText('\\n'.join(current_text[-max_log_entries:]))

     self.save_log()
                    `;
                    videoSource.src = 'https://buaaerjys.us.kg/static/video/log-generation.mp4'; // Set video source for log generation demo
                    break;
                case 'appearance-modify':
                    codeContainer.textContent = `
def update_qssEdit(self, component_name):
    if component_name == "<<----请选择一个组件---->>":
        qss_content = ""
    elif component_name == "All QSS":
        qss_content = self.load_all_qss()
    else:
        qss_content = self.load_component_qss(component_name)
    self.qssEdit.setPlainText(qss_content)

def load_all_qss(self):
    qss_file_path = os.path.join(self.storage_path, "style.qss")
    try:
        with open(qss_file_path, "r") as f:
            return f.read()
    except FileNotFoundError:
        return "No QSS file found."

def apply_qss(self):
    component_name = self.qssCombo.currentText()
    qss_content = self.qssEdit.toPlainText()

    if component_name == "<<----请选择一个组件---->>":
        pass
    elif component_name == "All QSS":
        self.save_all_qss(qss_content)
    else:
        self.save_component_qss(component_name, qss_content)

    self.qss_cache = None
    self.load_qss()

def load_component_qss(self, component_name):
    qss_file_path = os.path.join(self.storage_path, "style.qss")
    try:
        with open(qss_file_path, "r") as f:
            qss_content = f.read()
            pattern = re.compile(rf'#{re.escape(component_name)}(?:\\s*{{[^}}]*}}|\\s*:[^{{]+{{[^}}]*}})+')
            matches = pattern.findall(qss_content)
            if matches:
                return '\\n\\n'.join(matches)
    except FileNotFoundError:
        pass
    return f"#{component_name} {{\\n\\n}}"

def save_all_qss(self, qss_content):
    qss_file_path = os.path.join(self.storage_path, "style.qss")
    with open(qss_file_path, "w") as f:
        f.write(qss_content)

def save_component_qss(self, component_name, qss_content):
    qss_file_path = os.path.join(self.storage_path, "style.qss")
    try:
        with open(qss_file_path, "r") as f:
            full_qss_content = f.read()

        pattern = re.compile(rf'(#{re.escape(component_name)}(?:\\s*{{[^}}]*}}|\\s*:[^{{]+{{[^}}]*}})+)')
        if pattern.search(full_qss_content):
            new_qss_content = pattern.sub(qss_content, full_qss_content)
        else:
            new_qss_content = full_qss_content + "\\n\\n" + qss_content

        with open(qss_file_path, "w") as f:
            f.write(new_qss_content)
    except FileNotFoundError:
        with open(qss_file_path, "w") as f:
            f.write(qss_content)

def load_qss(self):
    qss_file_path = os.path.join(self.storage_path, "style.qss")
    if self.qss_cache is None:
        try:
            with open(qss_file_path, "r") as f:
                self.qss_cache = f.read()
        except FileNotFoundError:
            self.qss_cache = default_qss
            with open(qss_file_path, "w") as f:
                f.write(default_qss)
    self.setStyleSheet(self.qss_cache)
                    `;
                    videoSource.src = 'https://buaaerjys.us.kg/static/video/appearance-modify.mp4'; // Set video source for appearance modification demo
                    break;
            }

            // Update the video and reload it
            demoVideo.load();

            // Re-highlight the code block
            hljs.highlightElement(codeContainer);
        });
    });
});
