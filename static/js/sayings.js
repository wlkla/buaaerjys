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
                case 'start-page':
                    codeContainer.textContent = `
class SplashScreen(QWidget):
    def __init__(self, icon: Union[str, QIcon, FluentIconBase], app_name, record_text, parent=None, enableShadow=True):
        super().__init__(parent=parent)
        self.resize(1100, 750)
        self.setMouseTracking(True)
        self.points = []
        self.target = Target(self.width() / 2, self.height() / 2)
        self.initPoints()
        self._icon = icon
        self._iconSize = QSize(96, 96)

        self.titleBar = TitleBar(self)
        self.iconWidget = IconWidget(icon, self)
        self.shadowEffect = QGraphicsDropShadowEffect(self)

        self.iconWidget.setFixedSize(self._iconSize)
        self.shadowEffect.setColor(QColor(0, 0, 0, 50))
        self.shadowEffect.setBlurRadius(15)
        self.shadowEffect.setOffset(0, 4)

        self.softwareNameLabel = QLabel(app_name, self)
        self.softwareNameLabel.setGeometry(QRect(0, 160, 1100, 100))
        self.softwareNameLabel.setStyleSheet('font: 30pt "隶书";')
        self.softwareNameLabel.setAlignment(Qt.AlignCenter)

        self.recordLabel = QLabel(record_text, self)
        self.recordLabel.setGeometry(QRect(0, 500, 1100, 100))
        self.recordLabel.setStyleSheet('font: 14pt "隶书";')
        self.recordLabel.setAlignment(Qt.AlignCenter)

        FluentStyleSheet.FLUENT_WINDOW.apply(self.titleBar)

        if enableShadow:
            self.iconWidget.setGraphicsEffect(self.shadowEffect)

        if parent:
            parent.installEventFilter(self)

    def update(self, *args):
        super(SplashScreen, self).update()

    def setIcon(self, icon: Union[str, QIcon, FluentIconBase]):
        self._icon = icon
        self.update()

    def icon(self):
        return toQIcon(self._icon)

    def setIconSize(self, size: QSize):
        self._iconSize = size
        self.iconWidget.setFixedSize(size)
        self.update()

    def iconSize(self):
        return self._iconSize

    def setTitleBar(self, titleBar: QWidget):
        self.titleBar.deleteLater()
        self.titleBar = titleBar
        titleBar.setParent(self)
        titleBar.raise_()
        self.titleBar.resize(self.width(), self.titleBar.height())

    def eventFilter(self, obj, e: QEvent):
        if obj is self.parent():
            if e.type() == QEvent.Resize:
                self.resize(e.size())
            elif e.type() == QEvent.ChildAdded:
                self.raise_()

        return super().eventFilter(obj, e)

    def resizeEvent(self, e):
        iw, ih = self.iconSize().width(), self.iconSize().height()
        self.iconWidget.move(self.width() // 2 - iw // 2, self.height() // 2 - ih // 2)
        self.titleBar.resize(self.width(), self.titleBar.height())

    def finish(self):
        self.close()

    def paintEvent(self, e):
        super(SplashScreen, self).paintEvent(e)
        painter = QPainter()
        painter.begin(self)
        painter.setRenderHint(QPainter.Antialiasing)
        painter.fillRect(self.rect(), Qt.white)
        self.animate(painter)
        painter.end()

    def mouseMoveEvent(self, event):
        super(SplashScreen, self).mouseMoveEvent(event)
        self.target.x = event.x()
        self.target.y = event.y()
        self.update()

    def initPoints(self):
        self.points.clear()
        stepX = self.width() / 20
        stepY = self.height() / 20
        for x in range(0, self.width(), int(stepX)):
            for y in range(0, self.height(), int(stepY)):
                ox = x + random() * stepX
                oy = y + random() * stepY
                point = Point(ox, ox, oy, oy)
                point.valueChanged.connect(self.update)  # type: ignore
                self.points.append(point)
        findClose(self.points)

    def animate(self, painter):
        for p in self.points:
            value = abs(getDistance(self.target, p))
            if value < 4000:
                p.lineColor.setAlphaF(0.3)
                p.circleColor.setAlphaF(0.6)
            elif value < 20000:
                p.lineColor.setAlphaF(0.1)
                p.circleColor.setAlphaF(0.3)
            elif value < 40000:
                p.lineColor.setAlphaF(0.02)
                p.circleColor.setAlphaF(0.1)
            else:
                p.lineColor.setAlphaF(0)
                p.circleColor.setAlphaF(0)

            if p.lineColor.alpha():
                for pc in p.closest:
                    if not pc:
                        continue
                    path = QPainterPath()
                    path.moveTo(p.x, p.y)
                    path.lineTo(pc.x, pc.y)
                    painter.save()
                    painter.setPen(p.lineColor)
                    painter.drawPath(path)
                    painter.restore()
            painter.save()
            painter.setPen(Qt.NoPen)
            painter.setBrush(p.circleColor)
            painter.drawRoundedRect(QRectF(
                p.x - p.radius, p.y - p.radius, 2 * p.radius, 2 * p.radius), p.radius, p.radius)
            painter.restore()
            p.initAnimation()
                    `;
                    videoSource.src = 'https://buaaerjys.us.kg/static/video/start-page.mp4'; // Set video source for folder detection demo
                    break;
                case 'image-management':
                    codeContainer.textContent = `
class photoInterface(Ui_Form, QWidget):
    addPicture = pyqtSignal()

    def __init__(self):
        super(photoInterface, self).__init__()
        self.setupUi(self)
        self.setObjectName('photo')
        self.flow_layout = FlowLayout()
        self.scrollAreaWidgetContents.setLayout(self.flow_layout)
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        base_path = config.get('Settings', 'base_path')
        photo_list = base_path + '/photo/photo_list.txt'
        photo_like = base_path + '/photo/photo_like.txt'
        try:
            with open(photo_list, 'r', encoding='utf-8') as f:
                images_1 = [(line.strip(), 0) for line in f.readlines()]
            with open(photo_like, 'r', encoding='utf-8') as f:
                images_2 = [(line.strip(), 1) for line in f.readlines()]
            self.images = images_1 + images_2
            random.shuffle(self.images)
            self.importPhoto.clicked.connect(self.addPhoto)
            QTimer.singleShot(0, self.load_next_image)
        except:
            pass

    def load_next_image(self):
        if not self.images:
            return
        image, like_tag = self.images.pop(0)
        image = image.replace('\\\\', '/')
        if os.path.exists(image):
            q = QL(image, like_tag)
            q.likeSignal.connect(lambda file=image, widget=q: self.likeT(file, widget))
            q.deleteSignal.connect(lambda file=image, widget=q: self.deleteT(file, widget))
            q.zoomInSignal.connect(lambda file=image: self.zoomInT(file))
            self.flow_layout.addWidget(q)
        QTimer.singleShot(0, self.load_next_image)

    def addPhoto(self):
        files, ok = QFileDialog.getOpenFileNames(self, '添加照片', '', "Image Files (*.jpg *.png *.jpeg)")
        if files and ok:
            config = configparser.ConfigParser()
            config.read('./config.ini', encoding='utf-8')
            base_path = config.get('Settings', 'base_path')
            photo_list = base_path + '/photo/photo_list.txt'
            photo_like = base_path + '/photo/photo_like.txt'
            with open(photo_list, 'r', encoding='utf-8') as f:
                existing_images_1 = [line.strip() for line in f.readlines()]
            with open(photo_like, 'r', encoding='utf-8') as f:
                existing_images_2 = [line.strip() for line in f.readlines()]
            existing_images = existing_images_1 + existing_images_2
            self.images = [(image.replace('\\\\', '/'), 0) for image in files if image not in existing_images]
            if self.images:
                with open(photo_list, 'a', encoding='utf-8') as f:
                    for image, _ in self.images:
                        f.write(image + '\\n')
            QTimer.singleShot(0, self.load_next_image)

    def likeT(self, path, q):
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        base_path = config.get('Settings', 'base_path')
        photo_list = base_path + '/photo/photo_list.txt'
        photo_like = base_path + '/photo/photo_like.txt'
        if q.is_liked:
            q.like_action.setIcon(FluentIcon.HEART)
            q.like_action.setText('Like')
            with open(photo_like, 'r', encoding='utf-8') as f:
                lines = f.readlines()
            with open(photo_like, 'w', encoding='utf-8') as f:
                for line in lines:
                    if line.strip() != path:
                        f.write(line)
            with open(photo_list, 'a', encoding='utf-8') as f:
                f.write(path + '\\n')
            q.is_liked = 0
        else:
            q.like_action.setIcon(FluentIcon.EXPRESSIVE_INPUT_ENTRY)
            q.like_action.setText('UnLike')
            with open(photo_like, 'a', encoding='utf-8') as f:
                f.write(path + '\\n')
            f.close()
            with open(photo_list, 'r', encoding='utf-8') as f:
                lines = f.readlines()
            with open(photo_list, 'w', encoding='utf-8') as f:
                for line in lines:
                    if line.strip() != path:
                        f.write(line)
            q.is_liked = 1
        try:
            q.like_action.disconnect()
        except:
            pass
        self.update()
        self.addPicture.emit()  # type: ignore

    def deleteT(self, path, q):
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        base_path = config.get('Settings', 'base_path')
        photo_list = base_path + '/photo/photo_list.txt'
        photo_like = base_path + '/photo/photo_like.txt'
        txt = photo_like if q.is_liked else photo_list
        with open(txt, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        with open(txt, 'w', encoding='utf-8') as f:
            for line in lines:
                if line.strip() != path:
                    f.write(line)
        self.addPicture.emit()  # type: ignore

        for i in reversed(range(self.flow_layout.count())):
            widget = self.flow_layout.itemAt(i).widget()
            if widget.picture == path:
                self.flow_layout.removeWidget(widget)
                sip.delete(widget)
                break

    def zoomInT(self, path):
        os.startfile(path)
                    `;
                    videoSource.src = 'https://buaaerjys.us.kg/static/video/image-management.mp4'; // Set video source for real-time notification demo
                    break;
                case 'chat-management':
                    codeContainer.textContent = `
class chatInterface(Ui_Form, QWidget):
    minWin = pyqtSignal()
    norWin = pyqtSignal()
    addChat = pyqtSignal()

    def __init__(self):
        super(chatInterface, self).__init__()
        self.setupUi(self)
        self.setObjectName('chat')
        self.listen_clipboard = False
        self.msgshowWin = messageWindow()
        self.msgWin = newmsgWin()  # type: ignore
        self.msgWin.fileSaved.connect(self.updateFileList)  # type: ignore
        self.importMessage.clicked.connect(self.getNewMessage)
        self.button1.clicked.connect(self.showFlyout)
        self.initChat()

    def initChat(self):
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        base_path = config.get('Settings', 'base_path')
        chat_list = base_path + '/chat/chat_list.txt'
        chat_like = base_path + '/chat/chat_like.txt'
        try:
            with open(chat_list, 'r', encoding='utf-8') as f:
                chat_1 = [(line.strip(), 0) for line in f.readlines()]
            with open(chat_like, 'r', encoding='utf-8') as f:
                chat_2 = [(line.strip(), 1) for line in f.readlines()]
            self.chat = chat_1 + chat_2
            random.shuffle(self.chat)
            QTimer.singleShot(0, self.addMessageCard)
        except:
            pass

    def updateMessageCardIcon(self):
        for i in range(self.verticalLayout_2.count()):
            widget=self.verticalLayout_2.itemAt(i).widget()
            if isinstance(widget, AppCard):
                widget.updateIconOrText('message')

    def getNewMessage(self):
        self.clearLayout(self.msgWin.verticalLayout_2)
        print('hhh')
        self.minWin.emit()  # type: ignore
        print(1)
        clipboard = QApplication.clipboard()
        self.listen_clipboard = True

        def on_clipboard_changed():
            if not self.listen_clipboard:
                return
            text = clipboard.text()
            lines = text.split('\\n')
            if len(lines) % 3 == 0 and all(
                    re.match(r'^.*:$', lines[i]) and lines[i + 2] == '' for i in range(0, len(lines), 3)):
                self.norWin.emit()  # type: ignore
                self.msgWin.text = text
                users = list(set([lines[i].strip().split(':')[0] for i in range(0, len(lines), 3)]))
                for i in range(0, len(lines), 3):
                    nickname, message = lines[i].strip().split(':')[0], lines[i + 1]
                    message = lines[i + 1].strip()
                    if message:
                        if nickname == users[0]:
                            message_box = messageBoxMe(message)
                            self.msgWin.verticalLayout_2.addWidget(message_box)
                            message_box = messageBoxYou(message)
                            self.msgWin.verticalLayout_3.addWidget(message_box)
                        else:
                            message_box = messageBoxYou(message)
                            self.msgWin.verticalLayout_2.addWidget(message_box)
                            message_box = messageBoxMe(message)
                            self.msgWin.verticalLayout_3.addWidget(message_box)

                # 检查最后一个组件是否是弹簧
                last_item_2 = self.msgWin.verticalLayout_2.itemAt(self.msgWin.verticalLayout_2.count() - 1)
                last_item_3 = self.msgWin.verticalLayout_3.itemAt(self.msgWin.verticalLayout_3.count() - 1)
                if isinstance(last_item_2, QSpacerItem):
                    self.msgWin.verticalLayout_2.removeItem(last_item_2)
                if isinstance(last_item_3, QSpacerItem):
                    self.msgWin.verticalLayout_3.removeItem(last_item_3)

                has_scroll_bar = self.msgWin.ScrollArea.verticalScrollBar().isVisible()
                if not has_scroll_bar:
                    spacerItem = QSpacerItem(20, 40, QSizePolicy.Minimum, QSizePolicy.Expanding)
                    self.msgWin.verticalLayout_2.addItem(spacerItem)
                    self.msgWin.verticalLayout_3.addItem(spacerItem)
                self.msgWin.show()
                self.listen_clipboard = False

        clipboard.dataChanged.connect(on_clipboard_changed)  # type: ignore

    def updateFileList(self, file_path):
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        base_path = config.get('Settings', 'base_path')
        chat_list = base_path + '/chat/chat_list.txt'
        with open(chat_list, 'a', encoding='utf-8') as f:
            f.write(file_path + '\\n')
        self.chat = [(file_path, 0)]
        QTimer.singleShot(0, self.addMessageCard)

    def addMessageCard(self):
        if not self.chat:
            return
        chat, like_tag = self.chat.pop(0)
        path = chat.replace('\\\\', '/')
        try:
            with open(path, 'r', encoding='utf-8') as file:
                lines = file.readlines()
            # 获取两个用户
            users = list(set([lines[i].strip().split(':')[0] for i in range(0, len(lines), 3)]))
            [role_1, role_2] = users if len(users) == 2 else users + ['']
            card = AppCard(path, f'{role_1}与{role_2}的聊天记录', 'message', like_tag, self)
            card.likeSignal.connect(lambda file=path, widget=card: self.likeT(file, widget))
            card.deleteSignal.connect(lambda file=path, widget=card: self.deleteT(file, widget))
            # 检查最后一个组件是否是弹簧
            last_item = self.verticalLayout_2.itemAt(self.verticalLayout_2.count() - 1)
            if isinstance(last_item, QSpacerItem):
                self.verticalLayout_2.removeItem(last_item)
            self.verticalLayout_2.addWidget(card, alignment=Qt.AlignTop)
            card.play.connect(lambda: self.addMessageBox(path))
            has_bar = self.ScrollArea.verticalScrollBar().isVisible()
            if not has_bar:
                spacerItem = QSpacerItem(20, 40, QSizePolicy.Minimum, QSizePolicy.Expanding)
                self.verticalLayout_2.addItem(spacerItem)
        except:
            pass
        QTimer.singleShot(0, self.addMessageCard)

    def addMessageBox(self, path):
        try:
            with open(path, 'r', encoding='utf-8') as file:
                lines = file.readlines()
            # 获取两个用户
            users = list(set([lines[i].strip().split(':')[0] for i in range(0, len(lines), 3)]))
            for i in range(0, len(lines), 3):
                nickname, message = lines[i].strip().split(':')[0], lines[i + 1]
                message = lines[i + 1].strip()
                if message:
                    if nickname == users[0]:
                        message_box = messageBoxMe(message)
                        self.msgshowWin.verticalLayout_2.addWidget(message_box)
                        message_box = messageBoxYou(message)
                        self.msgshowWin.verticalLayout_3.addWidget(message_box)
                    else:
                        message_box = messageBoxYou(message)
                        self.msgshowWin.verticalLayout_2.addWidget(message_box)
                        message_box = messageBoxMe(message)
                        self.msgshowWin.verticalLayout_3.addWidget(message_box)

            #     self.msgshowWin.verticalLayout_3.addItem(spacerItem)
            self.msgshowWin.show()
        except:
            QMessageBox.warning(self, '错误', '未定位到文件，可能被移动或改名')

    def likeT(self, path, card):
        try:
            config = configparser.ConfigParser()
            config.read('./config.ini', encoding='utf-8')
            base_path = config.get('Settings', 'base_path')
            chat_list = base_path + '/chat/chat_list.txt'
            chat_like = base_path + '/chat/chat_like.txt'
            (my_icon, text, file_d, file_a) = (FluentIcon.HEART, 'Like', chat_like, chat_list) if card.is_liked else (
                FluentIcon.EXPRESSIVE_INPUT_ENTRY, 'Unlike', chat_list, chat_like)
            card.like_action.setIcon(my_icon)
            card.like_action.setText(text)
            with open(file_d, 'r', encoding='utf-8') as f:
                likes = f.readlines()
            with open(file_d, 'w', encoding='utf-8') as f:
                for like in likes:
                    like = like.strip()
                    if like != path:
                        f.write(like)
            with open(file_a, 'a', encoding='utf-8') as f:
                f.write(path + '\\n')
            card.is_liked = 1 - card.is_liked
            try:
                card.like_action.disconnect()
            except:
                pass
            self.update()
            self.addChat.emit()  # type: ignore
        except:
            pass

    def deleteT(self, path, card):
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        base_path = config.get('Settings', 'base_path')
        chat_list = base_path + '/chat/chat_list.txt'
        chat_like = base_path + '/chat/chat_like.txt'
        txt = chat_like if card.is_liked else chat_list
        with open(txt, 'r', encoding='utf-8') as f:
            likes = f.readlines()
        with open(txt, 'w', encoding='utf-8') as f:
            for like in likes:
                if like.strip() != path:
                    f.write(like)
        self.addChat.emit()  # type: ignore

        for i in reversed(range(self.verticalLayout_2.count())):
            widget = self.verticalLayout_2.itemAt(i).widget()
            if isinstance(widget, AppCard) and widget.path == path:
                self.verticalLayout_2.removeWidget(widget)
                widget.deleteLater()
                break

    def showFlyout(self):
        view = FlyoutView(
            image='./image/introduction.gif',
            title='支持微信消息导入',
            content="打开微信，选择想要保存的聊天记录，点击 ctrl+c 即可，按 shift 键可切换视图。\\n注意：每条消息中不可存在换行符，否则无法识别。",
            isClosable=True
        )
        view.widgetLayout.insertSpacing(1, 5)
        view.widgetLayout.addSpacing(5)
        w = Flyout.make(view, self.button1, self)
        view.closed.connect(w.close)

    def clearLayout(self, layout):
        while layout.count():
            child = layout.takeAt(0)
            # 如果子项是一个widget
            if child.widget():
                child.widget().deleteLater()
                    `;
                    videoSource.src = 'https://buaaerjys.us.kg/static/video/chat-management.mp4'; // Set video source for log generation demo
                    break;
                case 'audio-management':
                    codeContainer.textContent = `
class audioInterface(Ui_Form, QWidget):
    addAudio = pyqtSignal()

    def __init__(self):
        super(audioInterface, self).__init__()
        self.setupUi(self)
        self.setObjectName('audio')
        self.initAudio()
        self.importAudio.clicked.connect(self.addnewAudio)  # type: ignore

    def initAudio(self):
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        base_path = config.get('Settings', 'base_path')
        audio_list = base_path + '/audio/audio_list.txt'
        audio_like = base_path + '/audio/audio_like.txt'
        try:
            with open(audio_list, 'r', encoding='utf-8') as f:
                audio_1 = [(line.strip(), 0) for line in f.readlines()]
            with open(audio_like, 'r', encoding='utf-8') as f:
                audio_2 = [(line.strip(), 1) for line in f.readlines()]
            self.audios = audio_1 + audio_2
            random.shuffle(self.audios)
            QTimer.singleShot(0, self.addAudioCard)
        except:
            pass

    def updateAudioCardIcon(self):
        for i in range(self.verticalLayout_3.count()):
            widget=self.verticalLayout_3.itemAt(i).widget()
            if isinstance(widget,AppCard):
                widget.updateIconOrText('audio')

    def addAudioCard(self):
        if not self.audios:
            return
        audio, like_tag = self.audios.pop(0)
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        audio_card_content = config.get('Settings', 'audio_card_content')
        path = audio.replace('\\\\', '/')
        card = AppCard(path, audio_card_content, 'audio', like_tag, self)
        card.likeSignal.connect(lambda file=path, widget=card: self.likeT(file, widget))
        card.deleteSignal.connect(lambda file=path, widget=card: self.deleteT(file, widget))

        # 检查最后一个组件是否是弹簧
        last_item = self.verticalLayout_3.itemAt(self.verticalLayout_3.count() - 1)
        if isinstance(last_item, QSpacerItem):
            self.verticalLayout_3.removeItem(last_item)

        self.verticalLayout_3.addWidget(card, alignment=Qt.AlignTop)
        card.play.connect(lambda: self.playAudio(path))

        has_bar = self.ScrollArea.verticalScrollBar().isVisible()
        if not has_bar:
            spacerItem = QSpacerItem(20, 40, QSizePolicy.Minimum, QSizePolicy.Expanding)
            self.verticalLayout_3.addItem(spacerItem)

        QTimer.singleShot(0, self.addAudioCard)

    def addnewAudio(self):
        files, ok = QFileDialog.getOpenFileNames(self, '音频文件', '', "Audio Files (*.mp3 *.wav *.ogg *.flac)")
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        base_path = config.get('Settings', 'base_path')
        audio_list = base_path + '/audio/audio_list.txt'
        if files and ok:
            audio_like = base_path + '/audio/audio_like.txt'
            with open(audio_list, 'r', encoding='utf-8') as f:
                existing_audio_1 = [line.strip() for line in f.readlines()]
            with open(audio_like, 'r', encoding='utf-8') as f:
                existing_audio_2 = [line.strip() for line in f.readlines()]
            existing_audios = existing_audio_1 + existing_audio_2
            self.audios = [(audio.replace('\\\\', '/'), 0) for audio in files if audio not in existing_audios]
            if self.audios:
                with open(audio_list, 'a', encoding='utf-8') as f:
                    for audio, _ in self.audios:
                        f.write(audio + '\\n')
            QTimer.singleShot(0, self.addAudioCard)

    def likeT(self, path, card):
        try:
            config = configparser.ConfigParser()
            config.read('./config.ini', encoding='utf-8')
            base_path = config.get('Settings', 'base_path')
            audio_list = base_path + '/audio/audio_list.txt'
            audio_like = base_path + '/audio/audio_like.txt'
            (my_icon, text, file_d, file_a) = (
                FluentIcon.HEART, 'Like', audio_like, audio_list) if card.is_liked else (
                FluentIcon.EXPRESSIVE_INPUT_ENTRY, 'Unlike', audio_list, audio_like)
            card.like_action.setIcon(my_icon)
            card.like_action.setText(text)
            with open(file_d, 'r', encoding='utf-8') as f:
                likes = f.readlines()
            with open(file_d, 'w', encoding='utf-8') as f:
                for like in likes:
                    if like.strip() != path:
                        f.write(like)
            with open(file_a, 'a', encoding='utf-8') as f:
                f.write(path + '\\n')
            card.is_liked = 1 - card.is_liked
            try:
                card.like_action.disconnect()
            except:
                pass
            self.update()
            self.addAudio.emit()  # type: ignore
        except:
            pass

    def deleteT(self, path, card):
        for i in reversed(range(self.verticalLayout_3.count())):
            widget = self.verticalLayout_3.itemAt(i).widget()
            if isinstance(widget, AppCard) and widget.path == path:
                self.verticalLayout_3.removeWidget(widget)
                widget.deleteLater()
                break
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        base_path = config.get('Settings', 'base_path')
        audio_list = base_path + '/audio/audio_list.txt'
        audio_like = base_path + '/audio/audio_like.txt'
        txt = audio_like if card.is_liked else audio_list
        with open(txt, 'r', encoding='utf-8') as f:
            likes = f.readlines()
        with open(txt, 'w', encoding='utf-8') as f:
            for like in likes:
                if like.strip() != path:
                    f.write(like)
        self.addAudio.emit()  # type: ignore

    def playAudio(self, path):
        try:
            os.startfile(path, 'open')
        except:
            QMessageBox.warning(self, '提示', '未定位到文件，可能被移动或改名')
                    `;
                    videoSource.src = 'https://buaaerjys.us.kg/static/video/audio-management.mp4'; // Set video source for appearance modification demo
                    break;
                case 'video-management':
                    codeContainer.textContent = `
class videoInterface(Ui_Form, QWidget):
    addVideo = pyqtSignal()

    def __init__(self):
        super(videoInterface, self).__init__()
        self.setupUi(self)
        self.setObjectName('video')
        self.initVideo()
        self.importVideo.clicked.connect(self.addnewVideo)  # type: ignore

    def initVideo(self):
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        base_path = config.get('Settings', 'base_path')
        video_list = base_path + '/video/video_list.txt'
        video_like = base_path + '/video/video_like.txt'
        try:
            with open(video_list, 'r', encoding='utf-8') as f:
                video_1 = [(line.strip(), 0) for line in f.readlines()]
            with open(video_like, 'r', encoding='utf-8') as f:
                video_2 = [(line.strip(), 1) for line in f.readlines()]
            self.videos = video_1 + video_2
            random.shuffle(self.videos)
            QTimer.singleShot(0, self.addVideoCard)
        except:
            pass

    def updateVideoCardIcon(self):
        for i in range(self.verticalLayout_2.count()):
            widget = self.verticalLayout_2.itemAt(i).widget()
            if isinstance(widget, AppCard):
                widget.updateIconOrText('video')

    def addVideoCard(self):
        if not self.videos:
            return
        video, like_tag = self.videos.pop(0)
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        video_card_content = config.get('Settings', 'video_card_content')
        path = video.replace('\\\\', '/')
        card = AppCard(path, video_card_content, 'video', like_tag, self)
        card.likeSignal.connect(lambda file=path, widget=card: self.likeT(file, widget))
        card.deleteSignal.connect(lambda file=path, widget=card: self.deleteT(file, widget))

        # 检查最后一个组件是否是弹簧
        last_item = self.verticalLayout_2.itemAt(self.verticalLayout_2.count() - 1)
        if isinstance(last_item, QSpacerItem):
            self.verticalLayout_2.removeItem(last_item)

        self.verticalLayout_2.addWidget(card, alignment=Qt.AlignTop)
        card.play.connect(lambda: self.playVideo(path))

        has_bar = self.ScrollArea.verticalScrollBar().isVisible()
        if not has_bar:
            spacerItem = QSpacerItem(20, 40, QSizePolicy.Minimum, QSizePolicy.Expanding)
            self.verticalLayout_2.addItem(spacerItem)

        QTimer.singleShot(0, self.addVideoCard)

    def addnewVideo(self):
        files, ok = QFileDialog.getOpenFileNames(self, '添加视频', '', "Video Files (*.mp4 *.avi *.mkv *.mov *.wmv)")
        if files and ok:
            config = configparser.ConfigParser()
            config.read('./config.ini', encoding='utf-8')
            base_path = config.get('Settings', 'base_path')
            video_list = base_path + '/video/video_list.txt'
            video_like = base_path + '/video/video_like.txt'
            with open(video_list, 'r', encoding='utf-8') as f:
                existing_video_1 = [line.strip() for line in f.readlines()]
            with open(video_like, 'r', encoding='utf-8') as f:
                existing_video_2 = [line.strip() for line in f.readlines()]
            existing_videos = existing_video_1 + existing_video_2
            self.videos = [(video.replace('\\\\', '/'), 0) for video in files if video not in existing_videos]
            if self.videos:
                with open(video_list, 'a', encoding='utf-8') as f:
                    for video, _ in self.videos:
                        f.write(video + '\\n')
            QTimer.singleShot(0, self.addVideoCard)

    def likeT(self, path, card):
        try:
            config = configparser.ConfigParser()
            config.read('./config.ini', encoding='utf-8')
            base_path = config.get('Settings', 'base_path')
            video_list = base_path + '/video/video_list.txt'
            video_like = base_path + '/video/video_like.txt'
            (my_icon, text, file_d, file_a) = (
                FluentIcon.HEART, 'Like', video_like, video_list) if card.is_liked else (
                FluentIcon.EXPRESSIVE_INPUT_ENTRY, 'Unlike', video_list, video_like)

            card.like_action.setIcon(my_icon)
            card.like_action.setText(text)
            with open(file_d, 'r', encoding='utf-8') as f:
                likes = f.readlines()
            with open(file_d, 'w', encoding='utf-8') as f:
                for like in likes:
                    if like.strip() != path:
                        f.write(like)
            with open(file_a, 'a', encoding='utf-8') as f:
                f.write(path + '\\n')
            card.is_liked = 1 - card.is_liked
            try:
                card.like_action.disconnect()
            except:
                pass
            self.update()
            self.addVideo.emit()  # type: ignore
        except:
            pass

    def deleteT(self, path, card):
        for i in reversed(range(self.verticalLayout_2.count())):
            widget = self.verticalLayout_2.itemAt(i).widget()
            if isinstance(widget, AppCard) and widget.path == path:
                self.verticalLayout_2.removeWidget(widget)
                widget.deleteLater()
                break

        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        base_path = config.get('Settings', 'base_path')
        video_list = base_path + '/video/video_list.txt'
        video_like = base_path + '/video/video_like.txt'
        txt = video_like if card.is_liked else video_list
        with open(txt, 'r', encoding='utf-8') as f:
            likes = f.readlines()
        with open(txt, 'w', encoding='utf-8') as f:
            for like in likes:
                if like.strip() != path:
                    f.write(like)
        self.addVideo.emit()  # type: ignore

    def playVideo(self, path):
        try:
            os.startfile(path)
        except:
            QMessageBox.warning(self, '提示', '未定位到文件，可能被移动或改名')
                    `;
                    videoSource.src = 'https://buaaerjys.us.kg/static/video/video-management.mp4'; // Set video source for appearance modification demo
                    break;
                case 'material-collection':
                    codeContainer.textContent = `
class videoInterface(Ui_Form, QWidget):
    ......
    def likeT(self, path, card):
        try:
            config = configparser.ConfigParser()
            config.read('./config.ini', encoding='utf-8')
            base_path = config.get('Settings', 'base_path')
            video_list = base_path + '/video/video_list.txt'
            video_like = base_path + '/video/video_like.txt'
            (my_icon, text, file_d, file_a) = (
                FluentIcon.HEART, 'Like', video_like, video_list) if card.is_liked else (
                FluentIcon.EXPRESSIVE_INPUT_ENTRY, 'Unlike', video_list, video_like)

            card.like_action.setIcon(my_icon)
            card.like_action.setText(text)
            with open(file_d, 'r', encoding='utf-8') as f:
                likes = f.readlines()
            with open(file_d, 'w', encoding='utf-8') as f:
                for like in likes:
                    if like.strip() != path:
                        f.write(like)
            with open(file_a, 'a', encoding='utf-8') as f:
                f.write(path + '\\n')
            card.is_liked = 1 - card.is_liked
            try:
                card.like_action.disconnect()
            except:
                pass
            self.update()
            self.addVideo.emit()  # type: ignore
        except:
            pass

    def deleteT(self, path, card):
        for i in reversed(range(self.verticalLayout_2.count())):
            widget = self.verticalLayout_2.itemAt(i).widget()
            if isinstance(widget, AppCard) and widget.path == path:
                self.verticalLayout_2.removeWidget(widget)
                widget.deleteLater()
                break

        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        base_path = config.get('Settings', 'base_path')
        video_list = base_path + '/video/video_list.txt'
        video_like = base_path + '/video/video_like.txt'
        txt = video_like if card.is_liked else video_list
        with open(txt, 'r', encoding='utf-8') as f:
            likes = f.readlines()
        with open(txt, 'w', encoding='utf-8') as f:
            for like in likes:
                if like.strip() != path:
                    f.write(like)
        self.addVideo.emit()  # type: ignore

class audioInterface(Ui_Form, QWidget):
    ......

    def likeT(self, path, card):
        try:
            config = configparser.ConfigParser()
            config.read('./config.ini', encoding='utf-8')
            base_path = config.get('Settings', 'base_path')
            audio_list = base_path + '/audio/audio_list.txt'
            audio_like = base_path + '/audio/audio_like.txt'
            (my_icon, text, file_d, file_a) = (
                FluentIcon.HEART, 'Like', audio_like, audio_list) if card.is_liked else (
                FluentIcon.EXPRESSIVE_INPUT_ENTRY, 'Unlike', audio_list, audio_like)
            card.like_action.setIcon(my_icon)
            card.like_action.setText(text)
            with open(file_d, 'r', encoding='utf-8') as f:
                likes = f.readlines()
            with open(file_d, 'w', encoding='utf-8') as f:
                for like in likes:
                    if like.strip() != path:
                        f.write(like)
            with open(file_a, 'a', encoding='utf-8') as f:
                f.write(path + '\\n')
            card.is_liked = 1 - card.is_liked
            try:
                card.like_action.disconnect()
            except:
                pass
            self.update()
            self.addAudio.emit()  # type: ignore
        except:
            pass

    def deleteT(self, path, card):
        for i in reversed(range(self.verticalLayout_3.count())):
            widget = self.verticalLayout_3.itemAt(i).widget()
            if isinstance(widget, AppCard) and widget.path == path:
                self.verticalLayout_3.removeWidget(widget)
                widget.deleteLater()
                break
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        base_path = config.get('Settings', 'base_path')
        audio_list = base_path + '/audio/audio_list.txt'
        audio_like = base_path + '/audio/audio_like.txt'
        txt = audio_like if card.is_liked else audio_list
        with open(txt, 'r', encoding='utf-8') as f:
            likes = f.readlines()
        with open(txt, 'w', encoding='utf-8') as f:
            for like in likes:
                if like.strip() != path:
                    f.write(like)
        self.addAudio.emit()  # type: ignore

class chatInterface(Ui_Form, QWidget):
    ......

    def likeT(self, path, card):
        try:
            config = configparser.ConfigParser()
            config.read('./config.ini', encoding='utf-8')
            base_path = config.get('Settings', 'base_path')
            chat_list = base_path + '/chat/chat_list.txt'
            chat_like = base_path + '/chat/chat_like.txt'
            (my_icon, text, file_d, file_a) = (FluentIcon.HEART, 'Like', chat_like, chat_list) if card.is_liked else (
                FluentIcon.EXPRESSIVE_INPUT_ENTRY, 'Unlike', chat_list, chat_like)
            card.like_action.setIcon(my_icon)
            card.like_action.setText(text)
            with open(file_d, 'r', encoding='utf-8') as f:
                likes = f.readlines()
            with open(file_d, 'w', encoding='utf-8') as f:
                for like in likes:
                    like = like.strip()
                    if like != path:
                        f.write(like)
            with open(file_a, 'a', encoding='utf-8') as f:
                f.write(path + '\\n')
            card.is_liked = 1 - card.is_liked
            try:
                card.like_action.disconnect()
            except:
                pass
            self.update()
            self.addChat.emit()  # type: ignore
        except:
            pass

    def deleteT(self, path, card):
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        base_path = config.get('Settings', 'base_path')
        chat_list = base_path + '/chat/chat_list.txt'
        chat_like = base_path + '/chat/chat_like.txt'
        txt = chat_like if card.is_liked else chat_list
        with open(txt, 'r', encoding='utf-8') as f:
            likes = f.readlines()
        with open(txt, 'w', encoding='utf-8') as f:
            for like in likes:
                if like.strip() != path:
                    f.write(like)
        self.addChat.emit()  # type: ignore

        for i in reversed(range(self.verticalLayout_2.count())):
            widget = self.verticalLayout_2.itemAt(i).widget()
            if isinstance(widget, AppCard) and widget.path == path:
                self.verticalLayout_2.removeWidget(widget)
                widget.deleteLater()
                break

class photoInterface(Ui_Form, QWidget):
    ......

    def likeT(self, path, q):
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        base_path = config.get('Settings', 'base_path')
        photo_list = base_path + '/photo/photo_list.txt'
        photo_like = base_path + '/photo/photo_like.txt'
        if q.is_liked:
            q.like_action.setIcon(FluentIcon.HEART)
            q.like_action.setText('Like')
            with open(photo_like, 'r', encoding='utf-8') as f:
                lines = f.readlines()
            with open(photo_like, 'w', encoding='utf-8') as f:
                for line in lines:
                    if line.strip() != path:
                        f.write(line)
            with open(photo_list, 'a', encoding='utf-8') as f:
                f.write(path + '\\n')
            q.is_liked = 0
        else:
            q.like_action.setIcon(FluentIcon.EXPRESSIVE_INPUT_ENTRY)
            q.like_action.setText('UnLike')
            with open(photo_like, 'a', encoding='utf-8') as f:
                f.write(path + '\\n')
            f.close()
            with open(photo_list, 'r', encoding='utf-8') as f:
                lines = f.readlines()
            with open(photo_list, 'w', encoding='utf-8') as f:
                for line in lines:
                    if line.strip() != path:
                        f.write(line)
            q.is_liked = 1
        try:
            q.like_action.disconnect()
        except:
            pass
        self.update()
        self.addPicture.emit()  # type: ignore

    def deleteT(self, path, q):
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        base_path = config.get('Settings', 'base_path')
        photo_list = base_path + '/photo/photo_list.txt'
        photo_like = base_path + '/photo/photo_like.txt'
        txt = photo_like if q.is_liked else photo_list
        with open(txt, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        with open(txt, 'w', encoding='utf-8') as f:
            for line in lines:
                if line.strip() != path:
                    f.write(line)
        self.addPicture.emit()  # type: ignore

        for i in reversed(range(self.flow_layout.count())):
            widget = self.flow_layout.itemAt(i).widget()
            if widget.picture == path:
                self.flow_layout.removeWidget(widget)
                sip.delete(widget)
                break
                    `;
                    videoSource.src = 'https://buaaerjys.us.kg/static/video/material-collection.mp4'; // Set video source for appearance modification demo
                    break;
                case 'software-customization':
                    codeContainer.textContent = `
class settingInterface(Ui_Form, QWidget):
    updateName = pyqtSignal(str)
    updateText = pyqtSignal()
    updateIcon = pyqtSignal(str)
    updateCard = pyqtSignal(str)
    updateChat = pyqtSignal()

    def __init__(self):
        super(settingInterface, self).__init__()
        self.setupUi(self)
        self.setObjectName('setting')
        self.initUi()
        self.initFunction()

    def initUi(self):
        self.PushButton_8 = ColorPickerButton(QColor(156, 217, 249), '线条颜色', self.CardWidget_12)
        self.PushButton_8.setObjectName("PushButton_8")
        self.horizontalLayout_25.addWidget(self.PushButton_8)
        self.PushButton_9 = ColorPickerButton(QColor(156, 217, 249), '圆点颜色', self.CardWidget_13)
        self.PushButton_9.setObjectName("PushButton_9")
        self.horizontalLayout_27.addWidget(self.PushButton_9)
        self.PushButton_6 = ColorPickerButton(QColor(255, 170, 0), '聊天框颜色', self.CardWidget_8)
        self.PushButton_6.setObjectName("PushButton_6")
        self.horizontalLayout_17.addWidget(self.PushButton_6)
        self.PushButton_7 = ColorPickerButton(QColor(0, 170, 255), '聊天框颜色', self.CardWidget_9)
        self.PushButton_7.setObjectName("PushButton_7")
        self.horizontalLayout_19.addWidget(self.PushButton_7)

        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        self.app_name = config.get('Settings', 'app_name')
        self.app_icon = config.get('Settings', 'app_icon')
        self.chat_card_icon = config.get('Settings', 'chat_card_icon')
        self.audio_card_icon = config.get('Settings', 'audio_card_icon')
        self.video_card_icon = config.get('Settings', 'video_card_icon')
        self.base_path = config.get('Settings', 'base_path')
        self.picture_bottom_text = config.get('Settings', 'picture_bottom_text')
        self.audio_card_content = config.get('Settings', 'audio_card_content')
        self.video_card_content = config.get('Settings', 'video_card_content')
        self.my_bubble_color = config.get('Settings', 'my_bubble_color')
        self.other_bubble_color = config.get('Settings', 'other_bubble_color')
        self.waterfall_label_width = config.get('Settings', 'waterfall_label_width')
        self.duration = config.get('Settings', 'duration')
        self.line_color = config.get('Settings', 'line_color')
        self.circle_color = config.get('Settings', 'circle_color')
        self.avatar_me = config.get('Settings', 'avatar_me')
        self.avatar_other = config.get('Settings', 'avatar_other')

        self.LineEdit.setText(self.app_name)
        self.LineEdit_2.setText(self.picture_bottom_text)
        self.LineEdit_3.setText(self.audio_card_content)
        self.LineEdit_4.setText(self.video_card_content)
        self.CaptionLabel.setText(self.app_icon)
        self.CaptionLabel_2.setText(self.base_path)
        self.CaptionLabel_3.setText(self.chat_card_icon)
        self.CaptionLabel_4.setText(self.audio_card_icon)
        self.CaptionLabel_5.setText(self.video_card_icon)
        self.CaptionLabel_6.setText(self.avatar_me)
        self.CaptionLabel_7.setText(self.avatar_other)
        self.CompactSpinBox.setValue(int(self.waterfall_label_width))
        self.CompactSpinBox_2.setValue(int(self.duration))
        self.PushButton_8.setColor(QColor(*eval(self.line_color)))
        self.PushButton_9.setColor(QColor(*eval(self.circle_color)))
        self.PushButton_6.setColor(QColor(*eval(self.my_bubble_color)))
        self.PushButton_7.setColor(QColor(*eval(self.other_bubble_color)))

    def initFunction(self):
        self.LineEdit.editingFinished.connect(self.saveAppname)
        self.LineEdit_2.editingFinished.connect(self.savePictureBottomText)
        self.LineEdit_3.editingFinished.connect(self.saveAudioCardContent)
        self.LineEdit_4.editingFinished.connect(self.saveVideoCardContent)
        self.PushButton.clicked.connect(self.setAppIcon)
        self.PushButton_2.clicked.connect(self.choseFolder)
        self.PushButton_3.clicked.connect(self.choseChatCardIcon)
        self.PushButton_4.clicked.connect(self.choseAudioCardIcon)
        self.PushButton_5.clicked.connect(self.choseVideoCardIcon)
        self.PushButton_6.colorChanged.connect(self.saveMyBubbleColor)
        self.PushButton_7.colorChanged.connect(self.saveOtherBubbleColor)
        self.PushButton_8.colorChanged.connect(self.saveLineColor)
        self.PushButton_9.colorChanged.connect(self.saveCircleColor)
        self.PushButton_10.clicked.connect(self.choseAvatarMe)
        self.PushButton_11.clicked.connect(self.choseAvatarOther)
        self.CompactSpinBox.valueChanged.connect(self.saveWaterfallLabelWidth)
        self.CompactSpinBox_2.valueChanged.connect(self.saveDuration)

    def saveAppname(self):
        app_name = self.LineEdit.text()
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        config.set('Settings', 'app_name', app_name)
        with open('config.ini', 'w', encoding='utf-8') as f:
            config.write(f)

        self.updateName.emit(app_name)  # type: ignore

    def savePictureBottomText(self):
        picture_bottom_text = self.LineEdit_2.text()
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        config.set('Settings', 'picture_bottom_text', picture_bottom_text)
        with open('config.ini', 'w', encoding='utf-8') as f:
            config.write(f)

        self.updateText.emit()  # type: ignore

    def saveAudioCardContent(self):
        audio_card_content = self.LineEdit_3.text()
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        config.set('Settings', 'audio_card_content', audio_card_content)
        with open('config.ini', 'w', encoding='utf-8') as f:
            config.write(f)
        self.updateCard.emit('audio')  # type: ignore

    def saveVideoCardContent(self):
        video_card_content = self.LineEdit_4.text()
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        config.set('Settings', 'video_card_content', video_card_content)
        with open('config.ini', 'w', encoding='utf-8') as f:
            config.write(f)
        self.updateCard.emit('video')  # type: ignore

    def setAppIcon(self):
        app_icon, ok = QFileDialog.getOpenFileName(self, '选择图标', '', '图标文件(*.ico *.png *.jpg *.jpeg)')
        if ok:
            self.CaptionLabel.setText(app_icon)
            config = configparser.ConfigParser()
            config.read('./config.ini', encoding='utf-8')
            config.set('Settings', 'app_icon', app_icon)
            with open('config.ini', 'w', encoding='utf-8') as f:
                config.write(f)

            self.updateIcon.emit(app_icon)  # type: ignore

    def choseFolder(self):
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        base_path = config.get('Settings', 'base_path')
        new_path = QFileDialog.getExistingDirectory(self, "选择新的存储位置")
        if new_path:
            self.CaptionLabel_2.setText(new_path)
            for filename in os.listdir(base_path):
                shutil.move(os.path.join(base_path, filename), new_path)
            config.set('Settings', 'base_path', new_path)
            with open('config.ini', 'w', encoding='utf-8') as configfile:
                config.write(configfile)
            for file_name in ['chat_list.txt', 'chat_like.txt']:
                file_path = os.path.join(new_path, 'chat', file_name)
                with open(file_path, 'r', encoding='utf-8') as file:
                    lines = file.readlines()
                with open(file_path, 'w', encoding='utf-8') as file:
                    for line in lines:
                        new_line = line.replace(base_path, new_path)
                        file.write(new_line)
            self.updateChat.emit()  # type: ignore

    def choseChatCardIcon(self):
        chat_icon, ok = QFileDialog.getOpenFileName(self, '选择图标', '', '图标文件(*.ico *.png *.jpg *.jpeg)')
        if ok:
            self.CaptionLabel_3.setText(chat_icon)
            config = configparser.ConfigParser()
            config.read('./config.ini', encoding='utf-8')
            config.set('Settings', 'chat_card_icon', chat_icon)
            with open('config.ini', 'w', encoding='utf-8') as f:
                config.write(f)

            self.updateCard.emit('message')  # type: ignore

    def choseAudioCardIcon(self):
        audio_icon, ok = QFileDialog.getOpenFileName(self, '选择图标', '', '图标文件(*.ico *.png *.jpg *.jpeg)')
        if ok:
            self.CaptionLabel_4.setText(audio_icon)
            config = configparser.ConfigParser()
            config.read('./config.ini', encoding='utf-8')
            config.set('Settings', 'audio_card_icon', audio_icon)
            with open('config.ini', 'w', encoding='utf-8') as f:
                config.write(f)

            self.updateCard.emit('audio')  # type: ignore

    def choseVideoCardIcon(self):
        video_icon, ok = QFileDialog.getOpenFileName(self, '选择图标', '', '图标文件(*.ico *.png *.jpg *.jpeg)')
        if ok:
            self.CaptionLabel_5.setText(video_icon)
            config = configparser.ConfigParser()
            config.read('./config.ini', encoding='utf-8')
            config.set('Settings', 'video_card_icon', video_icon)
            with open('config.ini', 'w', encoding='utf-8') as f:
                config.write(f)

            self.updateCard.emit('video')  # type: ignore

    def saveMyBubbleColor(self):
        r, g, b, _ = self.PushButton_6.color.getRgb()
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        config.set('Settings', 'my_bubble_color', str((r, g, b)))
        with open('config.ini', 'w', encoding='utf-8') as f:
            config.write(f)

    def saveOtherBubbleColor(self):
        r, g, b, _ = self.PushButton_7.color.getRgb()
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        config.set('Settings', 'other_bubble_color', str((r, g, b)))
        with open('config.ini', 'w', encoding='utf-8') as f:
            config.write(f)

    def saveLineColor(self):
        r, g, b, _ = self.PushButton_8.color.getRgb()
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        config.set('Settings', 'line_color', str((r, g, b)))
        with open('config.ini', 'w', encoding='utf-8') as f:
            config.write(f)

    def saveCircleColor(self):
        r, g, b, _ = self.PushButton_9.color.getRgb()
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        config.set('Settings', 'circle_color', str((r, g, b)))
        with open('config.ini', 'w', encoding='utf-8') as f:
            config.write(f)

    def choseAvatarMe(self):
        avatar_me, ok = QFileDialog.getOpenFileName(self, '选择头像', '', '图片文件(*.png *.jpg *.jpeg)')
        if ok:
            self.CaptionLabel_6.setText(avatar_me)
            config = configparser.ConfigParser()
            config.read('./config.ini', encoding='utf-8')
            config.set('Settings', 'avatar_me', avatar_me)
            with open('config.ini', 'w', encoding='utf-8') as f:
                config.write(f)

    def choseAvatarOther(self):
        avatar_other, ok = QFileDialog.getOpenFileName(self, '选择头像', '', '图片文件(*.png *.jpg *.jpeg)')
        if ok:
            self.CaptionLabel_7.setText(avatar_other)
            config = configparser.ConfigParser()
            config.read('./config.ini', encoding='utf-8')
            config.set('Settings', 'avatar_other', avatar_other)
            with open('config.ini', 'w', encoding='utf-8') as f:
                config.write(f)

    def saveWaterfallLabelWidth(self):
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        config.set('Settings', 'waterfall_label_width', str(self.CompactSpinBox.value()))
        with open('config.ini', 'w', encoding='utf-8') as f:
            config.write(f)

    def saveDuration(self):
        config = configparser.ConfigParser()
        config.read('./config.ini', encoding='utf-8')
        config.set('Settings', 'duration', str(self.CompactSpinBox_2.value()))
        with open('config.ini', 'w', encoding='utf-8') as f:
            config.write(f)

                    `;
                    videoSource.src = 'https://buaaerjys.us.kg/static/video/software-customization.mp4'; // Set video source for appearance modification demo
                    break;
            }

            demoVideo.load();

            // Re-highlight the code block
            hljs.highlightElement(codeContainer);
        });
    });
});
