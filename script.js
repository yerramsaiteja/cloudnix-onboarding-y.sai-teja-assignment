// script.js - simple navigation + small interactions
$(function(){
  function gotoStep(n){
    $('.step').addClass('d-none');
    $('#step' + n).removeClass('d-none');
    $('#current-step').text(n);
    $('.step-pill').removeClass('active');
    $('.step-pill[data-step="'+ n +'"]').addClass('active');
    // smooth scroll to top of card
    $('html, body').animate({ scrollTop: $('.card').offset().top - 20 }, 250);
  }

  // Next buttons
  $('.next-btn').on('click', function(){
    const visible = $('.step:not(.d-none)').attr('id'); // e.g., step1
    const next = parseInt(visible.replace('step','')) + 1;
    if(next <= 3) gotoStep(next);
  });

  // Back buttons
  $('.back-btn').on('click', function(){
    const visible = $('.step:not(.d-none)').attr('id');
    const prev = parseInt(visible.replace('step','')) - 1;
    if(prev >= 1) gotoStep(prev);
  });

  // Apply theme button / selecting theme card
  $('.apply-btn').on('click', function(){
    const theme = $(this).data('theme');
    $('.theme-card').removeClass('selected');
    $('.selected-check').addClass('d-none');
    $(this).closest('.theme-card').addClass('selected');
    $(this).closest('.theme-card').find('.selected-check').removeClass('d-none');
    // store selected in a hidden place (for demo we use localStorage)
    localStorage.setItem('selectedTheme', theme);
    $(this).text('Selected').removeClass('btn-outline-primary btn-outline-success').addClass('btn-success');
    // small success hint
    $(this).closest('.theme-card').attr('aria-pressed', 'true');
  });

  // Make clicking the whole card apply theme
  $('.theme-card').on('click', function(e){
    // avoid double-trigger if click on button
    if($(e.target).is('button') || $(e.target).is('input')) return;
    const theme = $(this).data('theme');
    $(this).find('.apply-btn').trigger('click');
  });

  // Pricing form submit
  $('#pricing-form').on('submit', function(e){
    e.preventDefault();
    // Could validate and send; here show a simple done message
    alert('All set! Your onboarding details are saved.\nGood luck with your submission, Sai Teja.');
  });

  // init
  gotoStep(1);
});

