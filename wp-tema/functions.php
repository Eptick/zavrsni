<?php 
function zavrsni_enqueue() {
    wp_enqueue_style( 'reset', get_template_directory_uri() . '/reset.css' );
    wp_enqueue_style( 'style-name', get_stylesheet_uri() );
    wp_enqueue_script( 'jquery' );

    wp_enqueue_style( 'ui-kit', get_template_directory_uri() . 'gpio/static/uikit/css/uikit.min.css');
    wp_enqueue_script('common-socket', get_template_directory_uri() .'/gpio/static/socket/socket.io.slim.js');
    wp_enqueue_script('common-uikit', get_template_directory_uri() .'/gpio/static/uikit/js/uikit.min.js');
    wp_enqueue_script('common-uikit-icons', get_template_directory_uri() .'/gpio/static/uikit/js/uikit-icons.min.js');

    if(is_page()){
        global $wp_query;
            $template_name = get_post_meta( $wp_query->post->ID, '_wp_page_template', true );
            if($template_name == 'tpl-gpoi.php'){
                wp_enqueue_script('gpio-ve', 'https://unpkg.com/vue');
                wp_enqueue_style( 'gpio-css', get_template_directory_uri() . '/gpio/static/css/style.css' );
                wp_enqueue_script('gpio-main', get_template_directory_uri() .'/gpio/static/js/site.js');
            }
            if($template_name == 'tpl-speaker.php'){
                wp_enqueue_style( 'speaker-css', get_template_directory_uri() . '/speaker/static/css/style.css' );
                wp_enqueue_script('speaker-main', get_template_directory_uri() .'/speaker/static/js/site.js');
            }
       }
}
add_action( 'wp_enqueue_scripts', 'zavrsni_enqueue' );