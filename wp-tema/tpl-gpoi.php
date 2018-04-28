// Template Name: GPOI
<?php get_header() ?>
<div class="body">
    <div id="app">
        <div class="header">
            <button class="uk-button uk-button-default" type="button">Frames</button>
            <div uk-dropdown>
                <ul class="uk-nav uk-dropdown-nav">
                    <li v-on:click="addFrame()"><a href="#">New Frame</a></li>
                    <li v-on:click="removeFrame()"><a href="#">Remove Frame</a></li>
                </ul>
            </div>
            <button class="uk-button uk-button-primary send-frames" v-on:click="sendData()">Send frames</button>
        </div>
        <div id="slideshowBoards" v-if="show">
            <ul class="uk-slideshow-items boards" uk-height-viewport="min-height: 480">
                <li v-for="(board, index) in framesData" class="board-item">
                    <div class="board" :id="parseInt(index)">
                        <div class="row" v-for="(row, rowIndex) in framesData[index]">
                            <div class="led" v-for="(led, ledIndex) in row">
                                <div class="ledElement"
                                    v-on:click="setLedState(index, rowIndex, ledIndex)"
                                    v-bind:class="{ active: ledIsActive(index, rowIndex, ledIndex)}">
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="footer">
            <input type="number" name="delay" id="delay" placeholder="Time each frames sticks" class="uk-input" min="5" max="1000000" value="100" v-model="delay">
        </div>
    </div>
</div>

<?php get_footer() ?>